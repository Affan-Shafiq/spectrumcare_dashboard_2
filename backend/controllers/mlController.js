const { getFirestore } = require('../config/firebase');

/**
 * Get ML Model Performance Statistics
 */
const getMLStats = async (req, res) => {
    try {
        const db = getFirestore();

        // 1. Fetch Predictions and Evaluations
        const [predictionsSnapshot, evaluationsSnapshot] = await Promise.all([
            db.collection('autism_predictions').get(),
            db.collection('prediction_evaluations').get()
        ]);

        const predictions = [];
        predictionsSnapshot.forEach(doc => {
            predictions.push({ id: doc.id, ...doc.data() });
        });

        const evaluations = {};
        evaluationsSnapshot.forEach(doc => {
            const data = doc.data();
            evaluations[data.childId] = data;
        });

        // Helper to get consistent timestamp in seconds
        const getTimestamp = (p) => {
            if (!p?.timestamp) return 0;
            if (typeof p.timestamp._seconds === 'number') return p.timestamp._seconds;
            if (typeof p.timestamp.seconds === 'number') return p.timestamp.seconds;
            if (typeof p.timestamp.getTime === 'function') return Math.floor(p.timestamp.getTime() / 1000);
            const date = new Date(p.timestamp);
            return isNaN(date.getTime()) ? 0 : Math.floor(date.getTime() / 1000);
        };

        // 2. Filter for latest prediction per child
        const latestPredictionsPerChild = {};
        predictions.forEach(pred => {
            const childId = pred.childId;
            if (!childId) return;

            const currentTimestamp = getTimestamp(pred);
            const existingPred = latestPredictionsPerChild[childId];
            
            if (!existingPred || currentTimestamp > getTimestamp(existingPred)) {
                latestPredictionsPerChild[childId] = pred;
            }
        });

        const latestPredictions = Object.values(latestPredictionsPerChild);

        // 3. Calculate Metrics using latest predictions only
        let tp = 0, tn = 0, fp = 0, fn = 0;
        let totalConfidence = 0;
        let predictionCountWithConfidence = 0;
        
        const joinedResults = [];

        latestPredictions.forEach(pred => {
            const predResult = pred.predictionResult?.[0]?.result;
            const confidence = pred.predictionResult?.[0]?.confidence;

            if (confidence !== undefined) {
                totalConfidence += confidence;
                predictionCountWithConfidence++;
            }

            const groundTruth = evaluations[pred.childId];
            if (groundTruth) {
                // Determine ground truth from either mlGroundTruth flag or diagnosis label
                let actual = groundTruth.mlGroundTruth;
                
                // If diagnosis exists, it's often more reliable than the raw flag
                if (groundTruth.diagnosis) {
                    const diag = groundTruth.diagnosis.toLowerCase();
                    if (diag.includes('low')) actual = 'no';
                    else if (diag.includes('high') || diag.includes('moderate') || diag.includes('positive')) actual = 'yes';
                }
                
                if (predResult === 'yes' && actual === 'yes') tp++;
                else if (predResult === 'no' && actual === 'no') tn++;
                else if (predResult === 'yes' && actual === 'no') fp++;
                else if (predResult === 'no' && actual === 'yes') fn++;

                joinedResults.push({
                    id: pred.id,
                    childId: pred.childId,
                    predicted: predResult,
                    actual: actual,
                    confidence: confidence,
                    timestamp: pred.timestamp
                });
            }
        });

        const totalJoined = tp + tn + fp + fn;
        const precision = (tp + fp) > 0 ? (tp / (tp + fp)) * 100 : 0;
        const recall = (tp + fn) > 0 ? (tp / (tp + fn)) * 100 : 0;
        const accuracy = totalJoined > 0 ? ((tp + tn) / totalJoined) * 100 : 0;
        const f1Score = (precision + recall) > 0 ? (2 * (precision * recall) / (precision + recall)) : 0;
        const avgConfidence = predictionCountWithConfidence > 0 ? (totalConfidence / predictionCountWithConfidence) * 100 : 0;

        // 3. Get Model Info (using latest prediction)
        const latestPred = [...predictions].sort((a, b) => getTimestamp(b) - getTimestamp(a))[0];

        res.status(200).json({
            success: true,
            stats: {
                accuracy: Math.round(accuracy * 10) / 10,
                precision: Math.round(precision * 10) / 10,
                recall: Math.round(recall * 10) / 10,
                f1Score: Math.round(f1Score * 10) / 10,
                avgConfidence: Math.round(avgConfidence * 10) / 10,
                totalPredictions: predictions.length,
                totalEvaluated: totalJoined,
                lastUpdated: latestPred?.timestamp?.toDate?.() || new Date(),
                modelVersion: latestPred?.modelVersion || 'v1.0.0',
                modelType: 'XGBoost Classifier'
            },
            confusionMatrix: { tp, tn, fp, fn }
        });

    } catch (error) {
        console.error('Get ML stats error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch ML statistics',
                code: 'FETCH_FAILED'
            }
        });
    }
};

/**
 * Get Recent Screening Results with Ground Truth Mapping
 */
const getRecentResults = async (req, res) => {
    try {
        const db = getFirestore();

        // Fetch a larger set to ensure we get enough unique children after deduplication
        const predictionsSnapshot = await db.collection('autism_predictions')
            .orderBy('timestamp', 'desc')
            .limit(50) 
            .get();

        // Helper to get consistent Date object
        const getDate = (p) => {
            if (!p?.timestamp) return new Date();
            if (typeof p.timestamp.toDate === 'function') return p.timestamp.toDate();
            if (typeof p.timestamp._seconds === 'number') return new Date(p.timestamp._seconds * 1000);
            const date = new Date(p.timestamp);
            return isNaN(date.getTime()) ? new Date() : date;
        };

        const uniqueResultsMap = new Map();
        
        predictionsSnapshot.forEach(doc => {
            const pred = doc.data();
            const childId = pred.childId;
            
            // If we haven't seen this child yet, or this prediction is newer
            if (!uniqueResultsMap.has(childId)) {
                uniqueResultsMap.set(childId, {
                    id: doc.id,
                    childId: pred.childId,
                    date: getDate(pred),
                    score: pred.aq10Score || 0,
                    riskLevel: pred.predictionResult?.[0]?.originalResult || 'N/A',
                    prediction: pred.predictionResult?.[0]?.result,
                    confidence: pred.predictionResult?.[0]?.confidence || 0,
                    rawTimestamp: pred.timestamp?._seconds || 0
                });
            }
        });

        // Convert map to array and take top 10
        const results = Array.from(uniqueResultsMap.values())
            .sort((a, b) => b.rawTimestamp - a.rawTimestamp)
            .slice(0, 10);

        const evalPromises = results.map(res => 
            db.collection('prediction_evaluations').where('childId', '==', res.childId).limit(1).get()
        );

        const evalsSnapshots = await Promise.all(evalPromises);
        
        const finalResults = results.map((res, index) => {
            const evalSnap = evalsSnapshots[index];
            let accuracy = 0;
            let hasGroundTruth = false;

            if (!evalSnap.empty) {
                const evalData = evalSnap.docs[0].data();
                
                // Use robust mapping logic for ground truth
                let actual = evalData.mlGroundTruth;
                if (evalData.diagnosis) {
                    const diag = evalData.diagnosis.toLowerCase();
                    if (diag.includes('low')) actual = 'no';
                    else if (diag.includes('high') || diag.includes('moderate') || diag.includes('positive')) actual = 'yes';
                }

                accuracy = res.prediction === actual ? 100 : 0;
                hasGroundTruth = true;
            } else {
                // If no ground truth, we use confidence as a proxy for "expected accuracy" 
                accuracy = Math.round(res.confidence * 100);
            }

            return {
                ...res,
                accuracy,
                hasGroundTruth
            };
        });

        res.status(200).json({
            success: true,
            results: finalResults
        });

    } catch (error) {
        console.error('Get recent results error:', error);
        res.status(500).json({
            error: {
                message: 'Failed to fetch recent screening results',
                code: 'FETCH_FAILED'
            }
        });
    }
};

module.exports = {
    getMLStats,
    getRecentResults
};

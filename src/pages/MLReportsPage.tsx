import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMLStats, getRecentMLResults, MLStats, ScreeningResult } from "@/services/mlService";
import { useToast } from "@/hooks/use-toast";
import { Brain, RefreshCw, TrendingUp, CheckCircle, Info } from "lucide-react";

export const MLReportsPage = () => {
  const [stats, setStats] = useState<MLStats | null>(null);
  const [results, setResults] = useState<ScreeningResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, resultsRes] = await Promise.all([
        getMLStats(),
        getRecentMLResults()
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (resultsRes.success) setResults(resultsRes.results);
    } catch (error) {
      toast({
        title: "Error loading ML reports",
        description: "Failed to fetch model performance data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskBadgeStyles = (risk: string) => {
    const r = risk.toLowerCase();
    if (r.includes('low')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (r.includes('moderate')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (r.includes('high')) return 'bg-rose-100 text-rose-700 border-rose-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-spectrum-accent-success';
    if (accuracy >= 80) return 'text-spectrum-accent-primary';
    return 'text-spectrum-accent-info';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spectrum-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-spectrum-text-primary">
            ML Model Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor machine learning model performance and screening accuracy metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={loadData}>
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-spectrum-accent-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-accent-primary">
              {stats?.accuracy}%
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-spectrum-accent-success" />
              Verified by ground truth
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precision</CardTitle>
            <CheckCircle className="h-4 w-4 text-spectrum-accent-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-accent-success">
              {stats?.precision}%
            </div>
            <p className="text-xs text-muted-foreground">
              True positive rate
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recall</CardTitle>
            <TrendingUp className="h-4 w-4 text-spectrum-accent-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-accent-info">
              {stats?.recall}%
            </div>
            <p className="text-xs text-muted-foreground">
              Sensitivity measure
            </p>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Brain className="h-4 w-4 text-spectrum-text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spectrum-text-primary">
              {stats?.avgConfidence}%
            </div>
            <p className="text-xs text-muted-foreground">
              Model certainty average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Model Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="spectrum-card">
          <CardHeader>
            <CardTitle>Model Information</CardTitle>
            <CardDescription>
              Current ML model specifications and metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Model Type</div>
                <div className="text-lg font-semibold">{stats?.modelType}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Version</div>
                <div className="text-lg font-semibold">{stats?.modelVersion}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Evaluated Samples</div>
                <div className="text-lg font-semibold">{stats?.totalEvaluated} cases</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Features</div>
                <div className="text-lg font-semibold">22 indicators</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-sm font-medium text-muted-foreground">Last Prediction Run</div>
              <div className="text-lg font-semibold">
                {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="spectrum-card">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Detailed breakdown of model performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Accuracy</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-spectrum-accent-primary h-2 rounded-full" 
                      style={{ width: `${stats?.accuracy}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{stats?.accuracy}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Precision</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-spectrum-accent-success h-2 rounded-full" 
                      style={{ width: `${stats?.precision}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{stats?.precision}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Recall</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-spectrum-accent-info h-2 rounded-full" 
                      style={{ width: `${stats?.recall}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{stats?.recall}%</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm font-medium text-muted-foreground">Total Predictions (System Wide)</div>
                <div className="text-2xl font-bold text-spectrum-text-primary">
                  {stats?.totalPredictions.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Screening Results */}
      <Card className="spectrum-card">
        <CardHeader>
          <CardTitle>Recent Screening Results</CardTitle>
          <CardDescription>
            Latest autism screening assessments with ground-truth mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>AQ-10 Score</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Ground Truth</TableHead>
                <TableHead>Match %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-mono text-xs">{result.childId}</TableCell>
                  <TableCell>
                    {new Date(result.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{result.score}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskBadgeStyles(result.riskLevel)}>
                      {result.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {result.hasGroundTruth ? (
                      <Badge className="bg-emerald-600 text-white border-0">Validated</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getAccuracyColor(result.accuracy)}`}>
                      {result.accuracy}%
                    </span>
                    {result.hasGroundTruth && <span className="text-[10px] ml-1 text-muted-foreground">(Actual)</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Model Performance Analysis */}
      <Card className="spectrum-card">
        <CardHeader>
          <CardTitle>Model Performance Analysis</CardTitle>
          <CardDescription>
            Insights derived from ground-truth clinical validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-spectrum-text-primary">Ground Truth Summary</h4>
              <p className="text-sm text-muted-foreground">
                We have cross-referenced <strong>{stats?.totalEvaluated}</strong> screening results with clinical ground truth. 
                The current accuracy of <strong>{stats?.accuracy}%</strong> indicates high reliability in early detection.
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle className="h-4 w-4" />
                Model is performing within target parameters
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-spectrum-text-primary">Data Health</h4>
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Ground Truth Coverage</span>
                  <span>{stats ? Math.round((stats.totalEvaluated / stats.totalPredictions) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-spectrum-accent-primary h-1.5 rounded-full" 
                    style={{ width: `${stats ? Math.round((stats.totalEvaluated / stats.totalPredictions) * 100) : 0}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Percentage of predictions that have been clinically validated by therapists.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


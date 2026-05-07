const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializeFirebase } = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// FRONTEND_URL can be comma-separated for multiple origins e.g. "https://spectrumcare.tech,https://xxx.up.railway.app"
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim());

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Firebase
try {
    initializeFirebase();
} catch (error) {
    console.error('Failed to initialize Firebase:', error);
    process.exit(1);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'SpectrumDash Admin Backend is running',
        timestamp: new Date().toISOString()
    });
});

// Auth routes
app.use('/api/auth', require('./routes/authRoutes'));

// Content routes
app.use('/api/content', require('./routes/contentRoutes'));

// Therapist routes
app.use('/api/therapists', require('./routes/therapistRoutes'));

// Community routes
app.use('/api/community', require('./routes/communityRoutes'));

// ML reporting routes
app.use('/api/ml', require('./routes/mlRoutes'));

// Analytics routes
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Additional routes will be added here as we build each page



// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

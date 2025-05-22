const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const schoolRoutes = require('./routes/schoolRoutes');
const { testConnection } = require('./config/database');

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

testConnection();

app.use('/api', schoolRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'School Management API is running',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to School Management API',
        endpoints: {
            addSchool: 'POST /api/addSchool',
            listSchools: 'GET /api/listSchools?latitude={lat}&longitude={lon}',
            health: 'GET /health'
        }
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.use((error, req, res, next) => {
    console.error('Global error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

module.exports = app;
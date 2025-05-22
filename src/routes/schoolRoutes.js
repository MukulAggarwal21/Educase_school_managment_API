const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middleware/validation');

// Add school route
router.post('/addSchool', validateAddSchool, addSchool);

// List schools route
router.get('/listSchools', validateListSchools, listSchools);

module.exports = router;
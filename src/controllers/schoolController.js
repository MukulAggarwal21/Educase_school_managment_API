const School = require('../models/School');
const { calculateDistance } = require('../utils/distance');

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        
        const schoolData = {
            name: name.trim(),
            address: address.trim(),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        };
        
        const newSchool = await School.create(schoolData);
        
        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: newSchool
        });
        
    } catch (error) {
        console.error('Add school error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add school',
            error: error.message
        });
    }
};

const listSchools = async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);
        
        const schools = await School.findAll();
        
        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        }));
        
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        
        res.status(200).json({
            success: true,
            message: 'Schools retrieved successfully',
            data: schoolsWithDistance,
            userLocation: {
                latitude: userLat,
                longitude: userLon
            }
        });
        
    } catch (error) {
        console.error('List schools error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve schools',
            error: error.message
        });
    }
};

module.exports = {
    addSchool,
    listSchools
};
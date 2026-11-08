const express = require('express');
const router = express.Router();
const { getApplications, createApplication, deleteApplication } = require('../controllers/careerController');
// const verifyToken = require('../middleware/authMiddleware'); // Admin protection er jonno (optional)

router.get('/', getApplications);
router.post('/', createApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
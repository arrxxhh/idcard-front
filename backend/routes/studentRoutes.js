const express = require('express');
const router = express.Router();
const { getStudentCard } = require('../controllers/studentController');

router.get('/card/:id', getStudentCard);

module.exports = router;

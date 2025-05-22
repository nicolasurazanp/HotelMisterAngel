const express = require('express');
const router = express.Router();
const { obtenerHabitacionesPublicas } = require('../controllers/habitacionController');

router.get('/habitaciones', obtenerHabitacionesPublicas); 

module.exports = router;

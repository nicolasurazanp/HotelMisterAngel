const express = require('express');
const router = express.Router();
const { obtenerHabitacionesPublicas } = require('../controllers/habitacionController');

// Ruta para obtener todas las habitaciones sin autenticación (público)
router.get('/habitaciones', obtenerHabitacionesPublicas); // Solo obtener las habitaciones disponibles

module.exports = router;

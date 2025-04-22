const express = require('express');
const router = express.Router();
const Habitacion = require('../models/Habitacion');
const { obtenerHabitacionPorId,  } = require('../controllers/habitacionController');

// GET /api/habitaciones/:id
router.get('/:id', obtenerHabitacionPorId);

module.exports = router;
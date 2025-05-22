const express = require('express');
const router = express.Router();
const Habitacion = require('../models/Habitacion');
const { obtenerHabitacionPorId,  } = require('../controllers/habitacionController');

router.get('/:id', obtenerHabitacionPorId);

module.exports = router;
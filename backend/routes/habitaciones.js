const express = require('express');
const router = express.Router();
const Habitacion = require('../models/Habitacion');

// GET /api/habitaciones/:id
router.get('/:id', async (req, res) => {
  try {
    const habitacion = await Habitacion.findById(req.params.id);
    if (!habitacion) return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
});

module.exports = router;
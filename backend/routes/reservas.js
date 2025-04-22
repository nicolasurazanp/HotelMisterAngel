const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');
const Habitacion = require('../models/Habitacion');

// GET /api/reservas (NUEVA RUTA AÑADIDA)
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('habitacion');
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las reservas', error });
  }
});

// POST /api/reservas (EXISTENTE)
router.post('/', async (req, res) => {
  try {
    const { nombreCompleto, celular, cedula, email, fechas, habitacionId } = req.body;

    if (!nombreCompleto || !celular || !cedula || !email || !fechas || !habitacionId) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const habitacion = await Habitacion.findById(habitacionId);
    if (!habitacion) return res.status(404).json({ mensaje: 'Habitación no encontrada' });

    const nuevaReserva = new Reserva({
      nombreCompleto,
      celular,
      cedula,
      email,
      fechas,
      habitacion: habitacionId,
    });

    await nuevaReserva.save();
    res.status(201).json({ mensaje: 'Reserva registrada con éxito', reserva: nuevaReserva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la reserva', error });
  }
});

module.exports = router;
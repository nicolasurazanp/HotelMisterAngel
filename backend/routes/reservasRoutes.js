const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');
const Habitacion = require('../models/Habitacion');

// GET /api/reservas (NUEVA RUTA AÑADIDA)
router.get('/', async (req, res) => {
  try {
    const { habitacionId } = req.query;

    const filtro = habitacionId ? { habitacion: habitacionId } : {};

    const reservas = await Reserva.find(filtro).populate('habitacion');

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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const reservaEliminada = await Reserva.findByIdAndDelete(id);

    if (!reservaEliminada) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }

    res.json({ mensaje: 'Reserva eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la reserva', error });
  }
});

module.exports = router;
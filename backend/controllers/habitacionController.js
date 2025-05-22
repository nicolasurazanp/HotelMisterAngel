const Habitacion = require('../models/Habitacion');

const obtenerHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las habitaciones' });
  }
};

const crearHabitacion = async (req, res) => {
  try {
    const nuevaHabitacion = new Habitacion(req.body);
    await nuevaHabitacion.save();
    res.status(201).json(nuevaHabitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear la habitación' });
  }
};

const eliminarHabitacion = async (req, res) => {
  try {
    const { id } = req.params; 
    const habitacion = await Habitacion.findByIdAndDelete(id); 
    if (!habitacion) {
      return res.status(404).json({ msg: 'Habitación no encontrada' }); 
    }
    res.json({ msg: 'Habitación eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la habitación' });
  }
};

const actualizarHabitacion = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedData = req.body;
    const habitacion = await Habitacion.findByIdAndUpdate(id, updatedData, { new: true });
    if (!habitacion) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }
    res.json(habitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la habitación' });
  }
};

const obtenerHabitacionesPublicas = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find({ disponibilidad: true });
    if (!habitaciones || habitaciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron habitaciones disponibles' });
    }
    res.json(habitaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las habitaciones' });
  }
};

const obtenerHabitacionPorId = async (req, res) => {
  try {
      const habitacion = await Habitacion.findById(req.params.id);
      if (!habitacion) return res.status(404).json({ mensaje: 'Habitación no encontrada' });
      res.json(habitacion);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    }}

module.exports = { obtenerHabitaciones, crearHabitacion, eliminarHabitacion, actualizarHabitacion, obtenerHabitacionesPublicas, obtenerHabitacionPorId };


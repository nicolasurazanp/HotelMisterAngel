const Habitacion = require('../models/Habitacion');

// Obtener todas las habitaciones
const obtenerHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find(); // Obtén todas las habitaciones
    res.json(habitaciones); // Devuelve las habitaciones
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las habitaciones' });
  }
};

// Crear una nueva habitación
const crearHabitacion = async (req, res) => {
  try {
    const nuevaHabitacion = new Habitacion(req.body);
    await nuevaHabitacion.save(); // Guarda la nueva habitación en la base de datos
    res.status(201).json(nuevaHabitacion); // Devuelve la habitación creada
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear la habitación' });
  }
};

// Eliminar una habitación
const eliminarHabitacion = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la habitación a eliminar
    const habitacion = await Habitacion.findByIdAndDelete(id); // Elimina la habitación por su ID
    if (!habitacion) {
      return res.status(404).json({ msg: 'Habitación no encontrada' }); // Si no se encuentra la habitación
    }
    res.json({ msg: 'Habitación eliminada' }); // Confirmación de eliminación
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la habitación' });
  }
};

// Actualizar una habitación
const actualizarHabitacion = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la habitación a actualizar
    const updatedData = req.body; // Obtén los datos que se van a actualizar
    const habitacion = await Habitacion.findByIdAndUpdate(id, updatedData, { new: true }); // Actualiza la habitación
    if (!habitacion) {
      return res.status(404).json({ msg: 'Habitación no encontrada' }); // Si no se encuentra la habitación
    }
    res.json(habitacion); // Devuelve la habitación actualizada
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la habitación' });
  }
};

const obtenerHabitacionesPublicas = async (req, res) => {
  try {
    // Solo traemos las habitaciones disponibles (sin necesidad de autenticación)
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

module.exports = { obtenerHabitaciones, crearHabitacion, eliminarHabitacion, actualizarHabitacion, obtenerHabitacionesPublicas };


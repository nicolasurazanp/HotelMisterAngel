const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precioPorNoche: { type: Number, required: true },
  imagenes: [{ type: String }],
  disponibilidad: { type: Boolean, default: true },
  capacidad: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Habitacion', habitacionSchema);

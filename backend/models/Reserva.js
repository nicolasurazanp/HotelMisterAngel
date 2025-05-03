const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombreCompleto: String,
  celular: String,
  cedula: String,
  email: String,
  fechas: [Date],
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' },
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reserva', reservaSchema);
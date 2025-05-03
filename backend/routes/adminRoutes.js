const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { crearHabitacion, obtenerHabitaciones, eliminarHabitacion, actualizarHabitacion } = require('../controllers/habitacionController');

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

router.get('/habitaciones', verifyToken, isAdmin, obtenerHabitaciones); // Obtener todas las habitaciones
router.post('/habitaciones', verifyToken, isAdmin, crearHabitacion); // Crear una nueva habitación
router.delete('/habitaciones/:id', verifyToken, isAdmin, eliminarHabitacion); // Eliminar una habitación
router.put('/habitaciones/:id', verifyToken, isAdmin, actualizarHabitacion); // Actualizar una habitación


module.exports = router;

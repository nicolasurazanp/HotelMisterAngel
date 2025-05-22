const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { crearHabitacion, obtenerHabitaciones, eliminarHabitacion, actualizarHabitacion } = require('../controllers/habitacionController');

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.get('/habitaciones', verifyToken, isAdmin, obtenerHabitaciones); 
router.post('/habitaciones', verifyToken, isAdmin, crearHabitacion); 
router.delete('/habitaciones/:id', verifyToken, isAdmin, eliminarHabitacion); 
router.put('/habitaciones/:id', verifyToken, isAdmin, actualizarHabitacion); 


module.exports = router;

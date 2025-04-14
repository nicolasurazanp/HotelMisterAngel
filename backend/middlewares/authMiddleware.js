const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido' });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.rol !== 'admin') {
    return res.status(403).json({ msg: 'Acceso solo para administradores' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };

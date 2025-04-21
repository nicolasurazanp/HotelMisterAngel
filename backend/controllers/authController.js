const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

exports.register = async (req, res) => {
  try {
    const { nombre, telefono, email, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombre,
      telefono,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();
    res.status(201).json({ msg: 'Usuario registrado correctamente' });

  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Genera el token JWT
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      'tu_clave_secreta',  // Utiliza una clave secreta en producción
      { expiresIn: '1h' }
    );

    res.status(200).json({ msg: 'Login exitoso', token,
      user: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol }
     });
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor', error: err.message });
  }
};

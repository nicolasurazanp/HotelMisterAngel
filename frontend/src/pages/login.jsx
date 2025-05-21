// src/pages/Login.js

// Importación del hook useState para manejar el formulario
import { useState } from 'react';

// Importación de Link (para navegación interna) y useNavigate (para redirecciones programáticas)
import { Link, useNavigate } from 'react-router-dom';

// Importación del archivo de estilos específicos del login
import '../styles/Login.css';

// Componente Login
const Login = () => {
  // Estado que contiene los datos del formulario
  const [formData, setFormData] = useState({
    email: '',       // Campo de correo electrónico
    password: '',    // Campo de contraseña
  });

  // Estado para manejar errores (como credenciales inválidas)
  const [error, setError] = useState('');

  // Hook para redirigir al usuario después del login
  const navigate = useNavigate();

  // Función que actualiza los valores del formulario a medida que el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Actualiza solo el campo que ha cambiado
    });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    try {
      // Enviar petición al backend con los datos del formulario
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indica que se está enviando JSON
        },
        body: JSON.stringify(formData), // Convierte los datos del formulario a string
      });

      // Convierte la respuesta a JSON
      const result = await res.json();

      if (res.ok) {
        // Si el login fue exitoso, se guarda el token y el usuario en localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirige al usuario a la página principal (o podrías enviarlo a otra ruta según el rol)
        navigate('/');
      } else {
        // Si hay un error (credenciales incorrectas, por ejemplo)
        setError(result.msg); // Muestra el mensaje de error del backend
      }
    } catch (err) {
      // Si ocurre un error al conectarse con el servidor
      console.error(err);
      setError('Hubo un error, intenta nuevamente.'); // Mensaje genérico para el usuario
    }
  };

  // Renderizado del formulario
  return (
    <>
      {/* Fondo difuminado o decorativo */}
      <div className="login-background" />

      {/* Contenedor principal del formulario */}
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>

        {/* Si hay un error, se muestra */}
        {error && <p className="error-message">{error}</p>}

        {/* Formulario de login */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
};

export default Login;

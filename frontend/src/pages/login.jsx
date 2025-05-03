// src/pages/login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Importar toast
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ Mostrar toast de éxito al iniciar sesión correctamente
        toast.success('Inicio de sesión exitoso');

        // Guardar token y usuario (con rol) en localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirigir al home
        navigate('/');
      } else {
        setError(result.msg);
        // ✅ Mostrar toast de error con el mensaje del backend
        toast.error(result.msg || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error(err);
      setError('Hubo un error, intenta nuevamente.');
      // ✅ Mostrar toast de error general
      toast.error('Error del servidor. Intenta nuevamente.');
    }
  };

  return (
    <>
      <div className="login-background" />
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
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
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </>
  );
};

export default Login;

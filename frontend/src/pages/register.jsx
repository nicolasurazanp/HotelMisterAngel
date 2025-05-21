import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // 👈 Importa toast y su contenedor
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    password: '',
  });
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
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success('Registro exitoso. Redirigiendo a login...');
        setTimeout(() => {
          navigate('/login'); // Redirigir al login después del registro
        }, 2000);
      } else {
        toast.error(result.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error, intenta nuevamente.');
    }
  };

  return (
    <>
      <div className="login-background" />
      <div className="auth-container">
        <h2>Registro</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            required
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            required
            value={formData.telefono}
            onChange={handleChange}
          />
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
          <button type="submit">Registrarse</button>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Register;

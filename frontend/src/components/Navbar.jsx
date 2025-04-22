import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import "semantic-ui-css/semantic.min.css";

const Navbar = ({ onAuthClick }) => {
  const navigate = useNavigate();

  // Obtener usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!user;
  const isAdmin = user?.rol === 'admin';

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('user');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}></div>
      <ul className="nav-links">
        <li onClick={() => navigate('/')}>Inicio</li>
        <li onClick={() => navigate('/habitaciones')}>Habitaciones</li>

        {/* Secciones visibles solo si el usuario es admin */}
        {isAuthenticated && isAdmin && (
          <>
            <li onClick={() => navigate('/admin/habitaciones')}>Habitaciones (admin)</li>
            <li onClick={() => navigate('/admin/usuarios')}>Usuarios (admin)</li>
            <li onClick={() => navigate('/admin/reservas')}>Reservas (admin)</li>
          </>
        )}

        <li className="auth-btn" onClick={handleAuthClick}>
          {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

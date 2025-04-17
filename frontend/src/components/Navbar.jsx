import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import "semantic-ui-css/semantic.min.css";

const Navbar = ({ isAuthenticated, onAuthClick }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}></div>
      <ul className="nav-links">
        <li onClick={() => navigate('/')}>Inicio</li>
        <li onClick={() => navigate('/habitaciones')}>Habitaciones</li>
        <li onClick={() => navigate('/reservas')}>Reservas</li>
        <li onClick={() => navigate('/usuarios')}>Usuarios</li>
        <li className="auth-btn" onClick={onAuthClick}>
          {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
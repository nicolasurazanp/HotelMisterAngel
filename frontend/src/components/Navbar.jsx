import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
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
      </ul>
      
      {isAuthenticated ? (
        <Button 
          animated="vertical" 
          onClick={onAuthClick}
          className="auth-btn-animated"
        >
          <Button.Content hidden>Cerrar Sesión</Button.Content>
          <Button.Content visible>
            <i className="sign out icon"></i>
          </Button.Content>
        </Button>
      ) : (
        <button 
          className="auth-btn" 
          onClick={onAuthClick}
        >
          Iniciar Sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;
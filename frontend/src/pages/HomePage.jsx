// src/pages/HomePage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Asegúrate de tener este archivo CSS para estilos

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado
  useEffect(() => {
    // Verificar el estado de autenticación (puedes hacer esto con un JWT, por ejemplo)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Si hay token, el usuario está autenticado
    } else {
      setIsAuthenticated(false); // Si no hay token, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>Bienvenido a la Página Principal</h1>
      {isAuthenticated ? (
        <p>¡Estás autenticado! Aquí va el contenido de tu inicio.</p>
      ) : (
        <p>Redirigiendo a la página de inicio de sesión...</p>
      )}
    </div>
  );
};

export default HomePage;

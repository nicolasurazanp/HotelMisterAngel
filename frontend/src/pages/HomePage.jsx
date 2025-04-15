import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Asegúrate de tener este archivo CSS para estilos
import img1 from '../assets/don_Arlex.jpg'; 
import img2 from '../assets/urazan_01.jpg';
import img3 from '../assets/urazan_02.jpg';

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
      {isAuthenticated ? (
        <>
          <nav className="navbar">
            <div className="logo">🏨 Hotel Mister Angel</div>
            <ul className="nav-links">
              <li>🏠 Inicio</li>
              <li>🛏 Habitaciones</li>
              <li>📅 Reservas</li>
              <li>🧑‍💼 Usuarios</li>
              <li className="logout">🔒 Cerrar Sesión</li>
            </ul>
          </nav>

          <h2 className="section-title">🛏 Habitaciones Disponibles</h2>

          <div className="room-list">
            {/*seccion de don_Arlex*/}
            <div className="room-card">
              <img src={img1} />
              <h3>Habitación 101</h3>
              <p><strong>Tipo:</strong> Doble</p>
              <p>💰 Precio por noche: $120mil</p>
              <p>👥 Capacidad: 2 personas</p>
              <p className="disponible">✅ Disponible</p>
              <button className="btn">Reservar</button>
            </div>

            {/*seccion de urazan_01*/}
            <div className="room-card">
              <img src={img2} />
              <h3>Habitación 102</h3>
              <p><strong>Tipo:</strong> Suite</p>
              <p>💰 Precio por noche: $180mil</p>
              <p>👥 Capacidad: 3 personas</p>
              <p className="ocupada">❌ Ocupada</p>
              <button className="btn disabled" disabled>No disponible</button>
            </div>

            {/*seccion de urazan_02 */}
            <div className="room-card">
              <img src={img3} />
              <h3>Habitación 103</h3>
              <p><strong>Tipo:</strong> Individual</p>
              <p>💰 Precio por noche: $90mil</p>
              <p>👤 Capacidad: 1 persona</p>
              <p className="disponible">✅ Disponible</p>
              <button className="btn">Reservar</button>
            </div>
          </div>

          <footer className="footer">
            <p>© 2025 Hotel. Todos los derechos reservados.</p>
            <p>📍 Ubicación: Calle 123, Rivera, Huila</p>
            <p>📞 Contacto: ‪+57 300 123 4567‬</p>
          </footer>
        </>
      ) : (
        <p>Redirigiendo a la página de inicio de sesión...</p>
      )}
    </div>
  );
};

export default HomePage;
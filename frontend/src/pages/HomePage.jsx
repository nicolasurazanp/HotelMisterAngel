import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/HomePage.css';

const HomePage = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/habitaciones', {
          headers: { Authorization: token },
        });

        if (!res.ok) throw new Error('Error al obtener habitaciones');

        const data = await res.json();
        setHabitaciones(data);
      } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        setHabitaciones([]);
      }
    };

    fetchHabitaciones();
  }, [token]);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const handleReservaClick = (habitacion) => {
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redirigir al login
      navigate('/login');
    } else {
      console.log("Reserva realizada con éxito para", habitacion.nombre);
      // Aquí va la lógica para realizar la reserva
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">🏨 Hotel Mister Angel</div>
        <ul className="nav-links">
          <li>🏠 Inicio</li>
          <li>🛏 Habitaciones</li>
          <li>📅 Reservas</li>
          <li>🧑‍💼 Usuarios</li>
          <li className="logout" onClick={handleAuthClick}>
            {isAuthenticated ? '🔒 Cerrar Sesión' : '🔑 Iniciar Sesión'}
          </li>
        </ul>
      </nav>

      <h2 className="section-title">🛏 Habitaciones Disponibles</h2>

      <div className="room-list">
        {Array.isArray(habitaciones) && habitaciones.length === 0 ? (
          <p>No hay habitaciones disponibles en este momento.</p>
        ) : (
          habitaciones.map((habitacion, index) => (
            <div className="room-card" key={index}>
              {habitacion.imagenes && habitacion.imagenes.length > 0 ? (
                <div className="slider-container">
                  <Slider {...settings}>
                    {habitacion.imagenes.map((img, idx) => (
                      <div key={idx} className="slide-img">
                        <img
                          src={img}
                          alt={`Imagen ${idx + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <p>No hay imágenes disponibles</p>
              )}

              <h3>{habitacion.nombre}</h3>
              <p><strong>Descripción:</strong> {habitacion.descripcion}</p>
              <p>💰 Precio por noche: ${habitacion.precioPorNoche}</p>
              <p>👥 Capacidad: {habitacion.capacidad} personas</p>
              <p className={habitacion.disponibilidad ? 'disponible' : 'ocupada'}>
                {habitacion.disponibilidad ? '✅ Disponible' : '❌ Ocupada'}
              </p>
              {/* Mostrar siempre el botón de reserva */}
              <button
                className="btn"
                onClick={() => handleReservaClick(habitacion)}
              >
                {isAuthenticated ? 'Reservar' : 'Iniciar sesión para reservar'}
              </button>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        <p>© 2025 Hotel. Todos los derechos reservados.</p>
        <p>📍 Ubicación: Calle 123, Rivera, Huila</p>
        <p>📞 Contacto: ‪+57 300 123 4567‬</p>
      </footer>
    </div>
  );
};

export default HomePage;

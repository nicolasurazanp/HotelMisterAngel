// Importación de React y hooks
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar desde botones

// Importación del carrusel de imágenes
import Slider from 'react-slick';

// Componentes propios del proyecto
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Estilos del carrusel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Estilos específicos para la página principal
import '../styles/HomePage.css';

// Componente principal de la página de inicio
const HomePage = () => {
  // Estado para guardar las habitaciones que llegan desde el backend
  const [habitaciones, setHabitaciones] = useState([]);

  // Hook para redireccionar a otras rutas programáticamente
  const navigate = useNavigate();

  // useEffect para traer las habitaciones desde el servidor al cargar la página
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/habitaciones'); // Petición GET al backend
        if (!res.ok) throw new Error('Error al obtener habitaciones');
        const data = await res.json(); // Se parsea la respuesta a JSON
        setHabitaciones(data); // Se actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error('Error:', error); // Muestra el error en consola
        setHabitaciones([]); // Limpia el estado si hay un error
      }
    };

    fetchHabitaciones(); // Llamado de la función al cargar el componente
  }, []); // El array vacío significa que esto se ejecuta una sola vez

  // Configuración del carrusel
  const settings = {
    dots: true, // Muestra puntitos debajo del carrusel
    infinite: false, // No cicla infinitamente
    speed: 500, // Velocidad de transición en milisegundos
    slidesToShow: 1, // Cuántas imágenes se muestran a la vez
    slidesToScroll: 1, // Cuántas imágenes avanza por vez
    autoplay: true, // Inicia el carrusel automáticamente
    autoplaySpeed: 3000, // Tiempo entre cambios automáticos
    arrows: false, // Oculta las flechas de navegación
  };

  // Renderizado del componente
  return (
    <>
      <Navbar /> {/* Barra de navegación superior */}

      {/* Sección principal con una imagen destacada */}
      <header className="hero-section">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D" 
          alt="Hotel" 
          className="hero-image" 
        />
        <div className="hero-text">
          <h1>Hotel Mister Angel</h1>
          <p>A promise of well-being</p>
        </div>
      </header>

      {/* Sección de habitaciones dinámicas */}
      <section className="habitaciones-section">
        <h2>Habitaciones Disponibles</h2>
        <div className="room-list">
          {/* Si no hay habitaciones */}
          {habitaciones.length === 0 ? (
            <p>No hay habitaciones disponibles en este momento.</p>
          ) : (
            // Mostrar cada habitación en una card
            habitaciones.map((habitacion, index) => (
              <div className="room-card" key={index}>
                {/* Carrusel de imágenes */}
                {habitacion.imagenes?.length > 0 ? (
                  <Slider {...settings}>
                    {habitacion.imagenes.map((img, idx) => (
                      <div key={`${habitacion._id}-${idx}`}>
                        <img 
                          src={img} 
                          alt={`Imagen ${idx + 1}`} 
                          className="carousel-image" 
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <p>No hay imágenes disponibles</p>
                )}

                {/* Información de la habitación */}
                <h3>{habitacion.nombre}</h3>
                <p>{habitacion.descripcion}</p>
                <p><strong>${habitacion.precioPorNoche}</strong></p>
                <p>Capacidad: {habitacion.capacidad}</p>

                {/* Disponibilidad visual */}
                <p className={habitacion.disponibilidad ? 'disponible' : 'ocupada'}>
                  {habitacion.disponibilidad ? 'Disponible' : 'Ocupada'}
                </p>

                {/* Botón para reservar que lleva al detalle de la habitación */}
                <button
                  className="btn"
                  onClick={() => navigate(`/reservar/${habitacion._id}`)}
                >
                  Reservar
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer /> {/* Pie de página */}
    </>
  );
};

export default HomePage;

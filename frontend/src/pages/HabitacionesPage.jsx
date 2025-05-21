// Importación de hooks y componentes necesarios
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Componente para carruseles
import Navbar from '../components/Navbar'; // Barra de navegación superior
import Footer from '../components/Footer'; // Pie de página

// Estilos del carrusel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Estilos personalizados para esta página
import '../styles/HabitacionesPage.css';

// Componente principal de la página de habitaciones
const HabitacionesPage = () => {
  const [habitaciones, setHabitaciones] = useState([]); // Estado para almacenar las habitaciones obtenidas del backend
  const navigate = useNavigate(); // Hook para redireccionar a otra ruta

  // Hook que se ejecuta al cargar el componente
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/habitaciones'); // Petición al backend
        if (!res.ok) throw new Error('Error al obtener habitaciones'); // Control de errores HTTP
        const data = await res.json(); // Conversión de respuesta a JSON
        setHabitaciones(data); // Se actualiza el estado con las habitaciones
      } catch (error) {
        console.error('Error:', error); // Mensaje de error en consola
        setHabitaciones([]); // Si ocurre un error, se limpia la lista
      }
    };
    fetchHabitaciones(); // Se llama la función
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // Configuración del carrusel (Slider)
  const settings = {
    dots: true, // Puntos de navegación debajo del carrusel
    infinite: false, // No repetir infinitamente
    speed: 500, // Velocidad de transición entre imágenes (ms)
    slidesToShow: 1, // Mostrar una imagen por vez
    slidesToScroll: 1, // Avanzar una imagen por vez
    autoplay: true, // Activar autoplay
    autoplaySpeed: 3000, // Tiempo entre cada cambio automático (ms)
    arrows: false, // Ocultar flechas de navegación
  };

  // Renderizado del componente
  return (
    <>
      <Navbar /> {/* Encabezado */}

      <section className="habitaciones-section">
        <h1>Ver Habitaciones</h1>
        <div className="room-list">
          {/* Si no hay habitaciones disponibles */}
          {habitaciones.length === 0 ? (
            <p>No hay habitaciones disponibles en este momento.</p>
          ) : (
            // Si hay habitaciones, se mapean y se muestran
            habitaciones.map((habitacion, index) => (
              <div className="room-card" key={index}>
                {/* Carrusel de imágenes */}
                {habitacion.imagenes?.length > 0 ? (
                  <Slider {...settings}>
                    {habitacion.imagenes.map((img, idx) => (
                      <div key={`${habitacion._id}-${idx}`}>
                        <img src={img} alt={`Imagen ${idx + 1}`} className="carousel-image" />
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
                <p className={habitacion.disponibilidad ? 'disponible' : 'ocupada'}>
                  {habitacion.disponibilidad ? 'Disponible' : 'Ocupada'}
                </p>

                {/* Botón para reservar, redirige usando el ID de la habitación */}
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

export default HabitacionesPage;

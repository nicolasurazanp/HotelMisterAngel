import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/HabitacionesPage.css';

const HabitacionesPage = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/habitaciones');
        if (!res.ok) throw new Error('Error al obtener habitaciones');
        const data = await res.json();
        setHabitaciones(data);
      } catch (error) {
        console.error('Error:', error);
        setHabitaciones([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHabitaciones();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (loading) {
    return <div className="loading">Cargando habitaciones...</div>;
  }

  return (
    <>
      <Navbar />
      
      <section className="habitaciones-section">
        <h1>Ver Habitaciones</h1>
        <div className="room-list">
          {habitaciones.length === 0 ? (
            <p>No hay habitaciones disponibles en este momento.</p>
          ) : (
            habitaciones.map((habitacion, index) => (
              <div className="room-card" key={habitacion._id}>
                {habitacion.imagenes?.length > 0 ? (
                  <Slider {...settings}>
                    {habitacion.imagenes.map((img, idx) => (
                      <div key={`${habitacion._id}-${idx}`}>
                        <img
                          src={img}
                          alt={`Imagen de la habitación: ${habitacion.nombre}, ${idx + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="no-images">
                    <img
                      src="https://via.placeholder.com/400x300.png?text=Imagen+No+Disponible"
                      alt="Imagen no disponible"
                      className="carousel-image"
                    />
                    <p>No hay imágenes disponibles</p>
                  </div>
                )}
                <h3>{habitacion.nombre}</h3>
                <p>{habitacion.descripcion}</p>
                <p><strong>${habitacion.precioPorNoche}</strong></p>
                <p>Capacidad: {habitacion.capacidad}</p>
                <p className={habitacion.disponibilidad ? 'disponible' : 'ocupada'}>
                  {habitacion.disponibilidad ? 'Disponible' : 'Ocupada'}
                </p>
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

      <Footer />
    </>
  );
};

export default HabitacionesPage;

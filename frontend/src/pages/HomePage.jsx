import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/HomePage.css';

const HomePage = () => {
  const [habitaciones, setHabitaciones] = useState([]);
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

  return (
    <>
      <Navbar /> 

      <header className="hero-section">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D" alt="Hotel" className="hero-image" />
        <div className="hero-text">
          <h1>Hotel Mister Angel</h1>
          <p>A promise of well-being</p>
        </div>
      </header>

      <section className="habitaciones-section" >
        <h2>Habitaciones Disponibles</h2>
        <div className="room-list">
          {habitaciones.length === 0 ? (
            <p>No hay habitaciones disponibles en este momento.</p>
          ) : (
            habitaciones.map((habitacion, index) => (
              <div className="room-card" key={index}>
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

export default HomePage;

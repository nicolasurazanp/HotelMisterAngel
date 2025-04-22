import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ReservaPage.css';


const ReservaPage = () => {
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState(null);
  const [form, setForm] = useState({
    nombreCompleto: '',
    celular: '',
    cedula: '',
    email: '',
    fechas: [],
  });

  const navigate = useNavigate();

  const fetchHabitacion = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/habitaciones/${id}`);
      const data = await res.json();
      setHabitacion(data);
    } catch (err) {
      console.error('Error cargando habitación:', err);
    }
  };

  useEffect(() => {
    fetchHabitacion();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFechaChange = (date) => {
    setForm({ ...form, fechas: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          ...form,
          habitacionId: id,
        }),
      });

      if (!res.ok) throw new Error('Error al registrar la reserva');

      alert('Reserva registrada exitosamente');
      navigate('/');
    } catch (err) {
      console.error('Error al enviar reserva:', err);
      alert('Ocurrió un error');
    }
  };

  if (!habitacion) return <p>Cargando habitación...</p>;

  return (
    <div className="reserva-page">
      <h2>Reservar: {habitacion.nombre}</h2>
      <img src={habitacion.imagenes?.[0]} alt={habitacion.nombre} className="imagen-reserva" />
      <p>{habitacion.descripcion}</p>
      <p><strong>Precio por noche:</strong> ${habitacion.precioPorNoche}</p>

      <form className="form-reserva" onSubmit={handleSubmit}>
        <input type="text" name="nombreCompleto" placeholder="Nombre completo" onChange={handleChange} required />
        <input type="tel" name="celular" placeholder="Número de celular" onChange={handleChange} required />
        <input type="text" name="cedula" placeholder="Número de cédula" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        
        <label>Selecciona las fechas:</label>
        <Calendar onChange={handleFechaChange} selectRange={true} />
        
        <button type="submit">Realizar reserva</button>
      </form>
    </div>
  );
};

export default ReservaPage;

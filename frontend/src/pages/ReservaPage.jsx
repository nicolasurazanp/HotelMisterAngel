import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ReservaPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ReservaPage = () => {
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState(null);
  const [reservasExistentes, setReservasExistentes] = useState([]);
  const [form, setForm] = useState({
    nombreCompleto: '',
    celular: '',
    cedula: '',
    email: '',
    fechas: [],
  });

  const [hoverDate, setHoverDate] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/habitaciones/${id}`);
        const data = await res.json();
        setHabitacion(data);
      } catch (err) {
        console.error('Error cargando habitación:', err);
        toast.error('Error al cargar los datos de la habitación');
      }
    };

    const fetchReservasExistentes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reservas?habitacionId=${id}`);
        const data = await res.json();
        setReservasExistentes(data);
      } catch (err) {
        console.error('Error cargando reservas:', err);
        toast.error('Error al cargar las reservas existentes');
      }
    };

    fetchHabitacion();
    fetchReservasExistentes();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFechaChange = (date) => {
    setForm({ ...form, fechas: date });

    if (Array.isArray(date)) {
      setRangeStart(date[0]);
      setHoverDate(null);
    } else {
      setRangeStart(date);
    }
  };

  const verificarFechasDisponibles = () => {
    const { fechas } = form;
    if (Array.isArray(fechas) && fechas.length === 2) {
      const [startDate, endDate] = fechas.map((date) => new Date(date).getTime());

      for (let reserva of reservasExistentes) {
        const [reservaStart, reservaEnd] = reserva.fechas.map((f) => new Date(f).getTime());

        if (
          (startDate >= reservaStart && startDate <= reservaEnd) ||
          (endDate >= reservaStart && endDate <= reservaEnd) ||
          (startDate <= reservaStart && endDate >= reservaEnd)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificarFechasDisponibles()) {
      toast.error('Las fechas seleccionadas ya están ocupadas. Por favor, elige otras fechas.');
      return;
    }

    setIsSubmitting(true);

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

      toast.success('Reserva registrada exitosamente. Redirigiendo...');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Error al enviar reserva:', err);
      toast.error('Ocurrió un error al realizar la reserva');
      setIsSubmitting(false);
    }
  };

  const tileClassName = ({ date }) => {
    return isFechaOcupada(date) ? 'fecha-ocupada' : '';
  };

  const isFechaOcupada = (date) => {
    const dateTimestamp = date.getTime();

    return reservasExistentes.some((reserva) => {
      const [startDate, endDate] = reserva.fechas.map((f) => new Date(f).getTime());
      return dateTimestamp >= startDate && dateTimestamp <= endDate;
    });
  };

  if (!habitacion) return <p>Cargando habitación...</p>;

  return (
    <>
      <Navbar />
      <div className="reserva-page">
        <div className="reserva-container">
          <div className="habitacion-details">
            <h2>Reservar: {habitacion.nombre}</h2>
            <img src={habitacion.imagenes?.[0]} alt={habitacion.nombre} className="imagen-reserva" />
            <p className="precio-noche"><strong>PRECIO POR NOCHE:</strong> ${habitacion.precioPorNoche}</p>
            <p>{habitacion.descripcion}</p>
            <div className="indicador-fechas-ocupadas">
              <p><strong>Nota:</strong> Las fechas con fondo rojo están ocupadas y no se pueden seleccionar.</p>
            </div>
          </div>

          <div className="form-container">
            <h3 className="titulo-datos">Datos de reserva</h3>
            <form className="form-reserva" onSubmit={handleSubmit}>
              <input type="text" name="nombreCompleto" placeholder="Nombre completo" onChange={handleChange} required />
              <input type="tel" name="celular" placeholder="Número de celular" onChange={handleChange} required />
              <input type="text" name="cedula" placeholder="Número de cédula" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />

              <label>Selecciona las fechas:</label>
              <Calendar
                onChange={handleFechaChange}
                selectRange={true}
                onMouseLeave={() => setHoverDate(null)}
                tileClassName={tileClassName}
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Reservando...' : 'Realizar reserva'}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <Footer />
    </>
  );
};

export default ReservaPage;

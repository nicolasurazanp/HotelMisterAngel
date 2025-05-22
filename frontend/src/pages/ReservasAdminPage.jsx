import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReservasAdminPage.css'; 

const ReservasAdminPage = () => {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); 

    if (!token || !user || user.rol !== 'admin') {
      navigate('/');
      return;
    }

    const fetchReservas = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/reservas', {
          headers: { Authorization: token },
        });

        if (res.status === 401 || res.status === 403) {
          navigate('/');
          return;
        }

        const data = await res.json();
        setReservas(data);
      } catch (err) {
        console.error(err);
        setReservas([]);
        navigate('/');
      }
    };

    fetchReservas();
  }, [token, navigate]);

  const handleEliminar = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reservas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });

      if (res.ok) {
        setReservas(reservas.filter(r => r._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-reservas">
      <h1>Reservas Registradas</h1>
      <button onClick={() => navigate('/admin')} className="back-button"> Volver al panel</button>
      {reservas.length === 0 ? (
        <p>No hay reservas registradas aún.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cédula</th>
              <th>Celular</th>
              <th>Fechas</th>
              <th>Habitación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva._id}>
                <td>{reserva.nombreCompleto}</td>
                <td>{reserva.email}</td>
                <td>{reserva.cedula}</td>
                <td>{reserva.celular}</td>
                <td>
                  {reserva.fechas.map(f =>
                    new Date(f).toLocaleDateString()).join(' al ')
                  }
                </td>
                <td>{reserva.habitacion?.nombre || 'N/A'}</td>
                <td>
                  <button onClick={() => handleEliminar(reserva._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservasAdminPage;

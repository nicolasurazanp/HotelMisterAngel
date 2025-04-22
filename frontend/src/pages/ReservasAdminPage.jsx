// src/pages/ReservasAdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservasAdminPage = () => {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch('/api/reservas', {  // Cambiado: URL relativa
          headers: { Authorization: token },
        });
        if (!res.ok) throw new Error('Error al obtener reservas');
        const data = await res.json();
        setReservas(data);
      } catch (err) {
        console.error(err);
        setReservas([]);
      }
    };
    fetchReservas();
  }, [token]);

  const handleEliminar = async (id) => {
    try {
      const res = await fetch(`/api/reservas/${id}`, {  // Cambiado: URL relativa
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate
import "../styles/AdminCreateRoomPage.css";

const AdminCreateRoomPage = () => {
  const [roomData, setRoomData] = useState({
    nombre: '',
    descripcion: '',
    precioPorNoche: '',
    imagenes: [''],
    disponibilidad: true,
    capacidad: '',
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // 👈 Hook para redirigir

  // Verificación del token al cargar la página
  useEffect(() => {
    const verifyToken = async () => {
        try {
          if (!token) {
            navigate('/'); // Redirige si no hay token
            return;
          }
    
          const res = await fetch('http://localhost:5000/api/admin/users', {
            headers: { Authorization: token },
          });
    
          if (res.status === 401 || res.status === 403) {
            navigate('/'); // Redirige si el token no es válido
            return;
          }
    
        } catch (error) {
          console.error('Error al verificar token:', error);
          navigate('/'); // Redirige si hay error al verificar el token
        }
      };
    
      verifyToken();
    }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...roomData.imagenes];
    newImages[index] = value;
    setRoomData({ ...roomData, imagenes: newImages });
  };

  const addImageField = () => {
    setRoomData({ ...roomData, imagenes: [...roomData.imagenes, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/habitaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // 👈 Enviar token con prefijo Bearer
      },
      body: JSON.stringify(roomData),
    });

    if (res.ok) {
      alert('Habitación creada correctamente');
      setRoomData({
        nombre: '',
        descripcion: '',
        precioPorNoche: '',
        imagenes: [''],
        disponibilidad: true,
        capacidad: '',
      });

      // Redirigir a la página de habitaciones después de crear una
      navigate('/admin/habitaciones'); // 👈 Redirigir aquí
    } else {
      alert('Error al crear la habitación');
    }
  };

  return (
    <div className="admin-create-room-page">
      <h2>Crear nueva habitación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={roomData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={roomData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precioPorNoche"
          placeholder="Precio por noche"
          value={roomData.precioPorNoche}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          value={roomData.capacidad}
          onChange={handleChange}
          required
        />
        <div>
          <label>Imágenes (URLs):</label>
          {roomData.imagenes.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Imagen ${index + 1}`}
              required
            />
          ))}
          <button type="button" onClick={addImageField}>Agregar otra imagen</button>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="disponibilidad"
              checked={roomData.disponibilidad}
              onChange={(e) =>
                setRoomData({ ...roomData, disponibilidad: e.target.checked })
              }
            />
            Disponible
          </label>
        </div>
        <button type="submit">Crear Habitación</button>
      </form>
    </div>
  );
};

export default AdminCreateRoomPage;

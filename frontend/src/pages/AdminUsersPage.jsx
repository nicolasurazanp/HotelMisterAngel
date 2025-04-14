import React, { useEffect, useState } from 'react';
import '../styles/AdminUsersPage.css';
import { useNavigate } from 'react-router-dom';


const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ nombre: '', telefono: '', email: '', rol: '' });
  const navigate = useNavigate();


  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: token },
      });
  
      if (res.status === 401 || res.status === 403) {
        // Token inválido o sin permisos
        navigate('/');
        return;
      }
  
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn('La respuesta no es un array:', data);
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      navigate('/');
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ nombre: user.nombre, telefono: user.telefono, email: user.email, rol: user.rol });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este usuario?')) {
      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      fetchUsers();
    }
  };

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/admin/users/${editingUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(editedUser),
    });
    setEditingUserId(null);
    fetchUsers();
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users-page">
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              {editingUserId === user._id ? (
                <>
                  <td><input value={editedUser.nombre} onChange={(e) => setEditedUser({ ...editedUser, nombre: e.target.value })} /></td>
                  <td><input value={editedUser.telefono} onChange={(e) => setEditedUser({ ...editedUser, telefono: e.target.value })} /></td>
                  <td><input value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /></td>
                  <td>
                    <select value={editedUser.rol} onChange={(e) => setEditedUser({ ...editedUser, rol: e.target.value })}>
                      <option value="usuario">Usuario</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.nombre}</td>
                  <td>{user.telefono}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Editar</button>
                    <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;

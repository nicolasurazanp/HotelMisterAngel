import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [nombreAdmin, setNombreAdmin] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.rol !== 'admin') {
      navigate('/');
    } else {
      setNombreAdmin(user.nombre);
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <h2>Panel de Administración</h2>
        {nombreAdmin && <p className="admin-welcome">Bienvenido, <strong>{nombreAdmin}</strong></p>}
      </div>
      
      <p className="admin-dashboard-subtitle">Aquí puedes gestionar el sistema del hotel.</p>

      <ul className="admin-dashboard-links">
        <li><Link to="/" className="home-button">Ir a la Página Principal</Link></li>
        <li><Link to="/admin/users">Gestión de Usuarios</Link></li>
        <li><Link to="/admin/habitaciones">Ver Habitaciones</Link></li>
        <li><Link to="/admin/habitaciones/crear">Crear Nueva Habitación</Link></li>
        <li><Link to="/admin/reservas">Ver Reservas</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboardPage;

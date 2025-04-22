import { Link } from 'react-router-dom';
import '../styles/AdminDashboardPage.css';

const AdminDashboardPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de control del administrador.</p>
      
      <ul style={{ marginTop: '1rem', lineHeight: '2rem' }}>
        <li><Link to="/admin/users">👥 Gestión de Usuarios</Link></li>
        <li><Link to="/admin/habitaciones">🛏️ Ver Habitaciones</Link></li>
        <li><Link to="/admin/habitaciones/crear">➕ Crear Nueva Habitación</Link></li>
        <li><Link to="/admin/reservas">📋 Ver Reservas</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboardPage;

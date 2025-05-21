import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // 👈 Importa toast
import 'react-toastify/dist/ReactToastify.css'; // 👈 Estilos
import '../styles/AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [nombreAdmin, setNombreAdmin] = useState('');

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || user.rol !== 'admin') {
        toast.error('Acceso denegado. Debes iniciar sesión como administrador.'); // 👈 Toast
        navigate('/');
      } else {
        setNombreAdmin(user.nombre);
      }
    } catch (error) {
      toast.error('Error al verificar el usuario.'); // 👈 Toast de error inesperado
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <h2>Panel de Administración</h2>
        {nombreAdmin && (
          <p className="admin-welcome">
            Bienvenido, <strong>{nombreAdmin}</strong>
          </p>
        )}
      </div>

      <p className="admin-dashboard-subtitle">
        Aquí puedes gestionar el sistema del hotel.
      </p>

      <ul className="admin-dashboard-links">
        <li><Link to="/" className="home-button">Ir a la Página Principal</Link></li>
        <li><Link to="/admin/users">Gestión de Usuarios</Link></li>
        <li><Link to="/admin/habitaciones">Ver Habitaciones</Link></li>
        <li><Link to="/admin/habitaciones/crear">Crear Nueva Habitación</Link></li>
        <li><Link to="/admin/reservas">Ver Reservas</Link></li>
      </ul>

      {/* 👇 Contenedor de Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboardPage;

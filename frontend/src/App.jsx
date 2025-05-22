import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/HomePage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCreateRoomPage from './pages/AdminCreateRoomPage';
import AdminRoomsPage from './pages/AdminRoomsPage';
import AdminDashboardPage from './pages/adminDashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
import ReservaPage from './pages/ReservaPage'
import ReservasAdminPage from './pages/ReservasAdminPage';
import ContactPage from './pages/ContactPage';
import GaleriaPage from './pages/GaleriaPage';
import PreguntasFrecuentesPage from './pages/PreguntasFrecuentesPage';
import HabitacionesPage from './pages/HabitacionesPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reservar/:id" element={<ReservaPage />} />
      <Route path="/admin/reservas" element={<ReservasAdminPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/galeria" element={<GaleriaPage />} />
      <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentesPage />} />
      <Route path="/habitaciones" element={<HabitacionesPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/habitaciones"
        element={
          <ProtectedRoute>
            <AdminRoomsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/habitaciones/crear"
        element={
          <ProtectedRoute>
            <AdminCreateRoomPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/HomePage';
import AdminUsersPage from './pages/AdminUsersPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminCreateRoomPage from './pages/AdminCreateRoomPage';
import AdminRoomsPage from './pages/AdminRoomsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Ya no está protegida */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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

import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/HomePage';
import AdminUsersPage from './pages/AdminUsersPage';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
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
    </Routes>
  );
};

export default App;
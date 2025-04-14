import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import HomePage from './pages/HomePage'
import AdminUsersPage from './pages/AdminUsersPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
    </Routes>
  )
}

export default App


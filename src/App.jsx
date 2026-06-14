import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Missions from './pages/Missions'
import Profile from './pages/Profile'
import Store from './pages/Store'
import Login from './pages/Login'
import { AvatarProvider } from './context/AvatarContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
  const { user } = useAuth()
  if (!user) return <Login />
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/missoes" element={<Missions />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AvatarProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </AvatarProvider>
    </ThemeProvider>
  )
}

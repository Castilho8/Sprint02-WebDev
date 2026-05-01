import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Missions from './pages/Missions'
import Profile from './pages/Profile'
import Store from './pages/Store'
import { AvatarProvider } from './context/AvatarContext'

export default function App() {
  return (
    <AvatarProvider>
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
    </AvatarProvider>
  )
}

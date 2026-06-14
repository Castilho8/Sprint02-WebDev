import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('carefit_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = ({ nome, email, empresa }) => {
    const memberSince = new Date()
      .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
      .replace(/^\w/, c => c.toUpperCase())
    const userData = { nome, email, empresa, telefone: '', nascimento: '', memberSince }
    localStorage.setItem('carefit_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('carefit_user')
    setUser(null)
  }

  const updateUser = (fields) => {
    const updated = { ...user, ...fields }
    localStorage.setItem('carefit_user', JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

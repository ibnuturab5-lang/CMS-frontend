'use client'

import { createContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface User {
  id: number
  email: string
}

interface AuthContextType {
  user: User | null
  checkAuth: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  checkAuth: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/auth/me')
      setUser(res.data.user)
    } catch {
      setUser(null)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
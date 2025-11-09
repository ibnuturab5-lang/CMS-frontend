'use client'

import { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '@/app/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  const handleLogout = async () => {
    await axios.post('/api/auth/logout')
    logout()
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl">Contact Manager</h1>
        {user && <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>}
      </div>
    </nav>
  )
}
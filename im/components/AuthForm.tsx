'use client'

import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '@/app/context/AuthContext'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { checkAuth } = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`/api/auth/${isLogin ? 'login' : 'signup'}`, { email, password })
      checkAuth()
    } catch (error) {
      alert('Error: ' + (error as any).response?.data?.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {isLogin ? 'Login' : 'Signup'}
      </button>
      <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full mt-2 text-blue-500">
        {isLogin ? 'Need to signup?' : 'Already have an account?'}
      </button>
    </form>
  )
}
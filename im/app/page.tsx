'use client'

import { useContext, useEffect } from 'react'
import AuthForm from '@/components/AuthForm'
import ContactList from '@/components/ContactList'
import Navbar from '@/components/Navbar'
import { AuthContext } from './context/AuthContext'


export default function Home() {
  const { user, checkAuth } = useContext(AuthContext)

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        {user ? <ContactList /> : <AuthForm />}
      </main>
    </div>
  )
}
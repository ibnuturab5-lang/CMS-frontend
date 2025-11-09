'use client'

import { useState } from 'react'
import axios from 'axios'

interface ContactFormProps {
  contact?: { id: number; name: string; email: string; phone?: string }
  onSave: () => void
}

export default function ContactForm({ contact, onSave }: ContactFormProps) {
  const [name, setName] = useState(contact?.name || '')
  const [email, setEmail] = useState(contact?.email || '')
  const [phone, setPhone] = useState(contact?.phone || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (contact) {
        await axios.put(`/api/contacts/${contact.id}`, { name, email, phone })
      } else {
        await axios.post('/api/contacts', { name, email, phone })
      }
      onSave()
    } catch (error) {
      alert('Error saving contact')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mb-4">
      <h3 className="text-xl mb-4">{contact ? 'Edit Contact' : 'Add Contact'}</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-4 border"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        {contact ? 'Update' : 'Add'}
      </button>
    </form>
  )
}
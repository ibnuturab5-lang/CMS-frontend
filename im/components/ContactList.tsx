'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import ContactForm from './ContactForm'

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [editing, setEditing] = useState<Contact | null>(null)

  const fetchContacts = async () => {
    const res = await axios.get('/api/contacts')
    setContacts(res.data)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const deleteContact = async (id: number) => {
    await axios.delete(`/api/contacts/${id}`)
    fetchContacts()
  }

  return (
    <div>
      <ContactForm onSave={fetchContacts} />
      {editing && <ContactForm contact={editing} onSave={() => { setEditing(null); fetchContacts() }} />}
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li key={contact.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            <div>
              <button onClick={() => setEditing(contact)} className="mr-2 text-blue-500">Edit</button>
              <button onClick={() => deleteContact(contact.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
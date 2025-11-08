'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ContactType{
    _id:string,
    name:string,
    email:string,
    phone:string,
}
export default function ContactTable() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await axios.get('/api/contacts');
    setContacts(res.data);
  };

  const deleteContact = async (id:string) => {
    await axios.delete(`/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Contacts</h1>
      <table className="w-full bg-white shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact:ContactType) => (
            <tr key={contact._id} className="border-b">
              <td className="p-2">{contact.name}</td>
              <td className="p-2">{contact.email}</td>
              <td className="p-2">{contact.phone}</td>
              <td className="p-2">
                <button onClick={() => deleteContact(contact._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
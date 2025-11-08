'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <a href="/dashboard" className="block p-2 hover:bg-gray-700">Contacts</a>
        </li>
        <li className="mb-2">
          <a href="/dashboard/add-contact" className="block p-2 hover:bg-gray-700">Add Contact</a>
        </li>
        <li>
          <button onClick={handleLogout} className="block w-full text-left p-2 hover:bg-gray-700">Logout</button>
        </li>
      </ul>
    </aside>
  );
}
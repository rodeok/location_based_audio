import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      router.push('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block mb-1">Name</label>
    <div className="relative">
      <FaUser className="absolute top-3 left-3 text-gray-400" />
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        // className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 placeholder-black"
        className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300"
        required
      />
    </div>
  </div>
  <div>
    <label htmlFor="email" className="block mb-1">Email</label>
    <div className="relative">
      <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
      <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300"
              required
            />
    </div>
  </div>
  <div>
    <label htmlFor="password" className="block mb-1">Password</label>
    <div className="relative">
      <FaLock className="absolute top-3 left-3 text-gray-400" />
      <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300"
              required
            />
    </div>
  </div>
  <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
    Sign Up
  </button>
</form>
      <p className="mt-4 text-center">
        Already have an account? <Link href="/login"  className="text-blue-500 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaComments, FaHome, FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import LoginForm from './login-form';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Kiri */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold text-blue-600">
            RBB Market
          </Link>
        </div>

        {/* Tengah: Search Bar */}
        <div className="flex-1 px-6 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Kanan: Nav Items */}
        <div className="flex space-x-6 items-center">
          <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 transition">
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600 transition">
            <FaUserCircle className="mr-1" />
            Profile
          </Link>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <FaSignInAlt className="mr-1" />
            Login
          </button>
        </div>
      </nav>

      {/* Komponen Login */}
      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;

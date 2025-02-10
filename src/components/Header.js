'use client';

import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-white text-3xl font-bold tracking-wide hover:opacity-90">
          College<span className="text-yellow-400">Portal</span>
        </a>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300">
            Home
          </a>
          <a href="/about" className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300">
            About
          </a>
          <a href="/program" className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300">
            Programs
          </a>
          <a href="/contact" className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300">
            Contact
          </a>

          {user ? (
            <div className="flex items-center space-x-4">
              <div
                className="relative"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center text-blue-900 font-bold">
                  {user.name[0]}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-48">
                    <div className="text-black font-semibold">{user.name}</div>
                    <div className="text-gray-600 text-sm">{user.email}</div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 mt-2 rounded-lg w-full text-sm hover:bg-red-400 transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </nav>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="bg-blue-800 md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a
              href="#"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#programs"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </a>
            <a
              href="#contact"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            {user ? (
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center text-blue-900 font-bold"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.name[0]}
                </div>

                {dropdownOpen && (
                  <div className="mt-2 bg-white shadow-lg rounded-lg p-4 w-48">
                    <div className="text-black font-semibold">{user.name}</div>
                    <div className="text-gray-600 text-sm">{user.email}</div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 mt-2 rounded-lg w-full text-sm hover:bg-red-400 transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

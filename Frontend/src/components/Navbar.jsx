import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Settings, Menu, X } from 'lucide-react';
import logo from '../assets/gv.png';

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout && logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#0f172a] text-[#e0f2fe] dark:text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="font-bold text-lg">Good Vibes</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/blogs" className="hover:underline">All Blogs</a>
          <a href="/myblogs" className="hover:underline">My Blogs</a>
          <a href="/blogs/create" className="hover:underline">Create Blog</a>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-blue-400"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              aria-label="Settings menu"
            >
              <Settings className="h-9 w-9 pt-2" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <a href="/blogs" className="block px-4 py-2 hover:underline">All Blogs</a>
          <a href="/myblogs" className="block px-4 py-2 hover:underline">My Blogs</a>
          <a href="/blogs/create" className="block px-4 py-2 hover:underline">Create Blog</a>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch('https://blog3-g0ib.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setForm({ name: '', email: '', password: '' });
        navigate('/');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900 text-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-lg p-6 sm:p-8 bg-[#1e293b] text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#e0f2fe]">
            Sign Up
          </h2>

          {message && (
            <p
              className={`mb-4 text-center font-semibold ${
                message.type === 'error' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {message.text}
            </p>
          )}

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-gray-300 text-sm sm:text-base">
            Already have an account?{' '}
            <Link to="/" className="hover:underline font-semibold text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

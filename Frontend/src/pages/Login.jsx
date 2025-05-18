import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch('https://blog3-g0ib.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage({ type: 'success', text: 'Login successful!' });
        navigate('/blogs');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0f172a] text-white">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg p-8 w-full max-w-md bg-[#1e293b]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#e0f2fe]">
          Login
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-semibold ${
              message.type === 'error' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message.text}
          </p>
        )}

        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        />

        <label className="block mb-2 font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
          required
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="hover:underline font-semibold text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

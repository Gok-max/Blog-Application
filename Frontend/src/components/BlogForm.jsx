// src/pages/BlogDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://blog3-g0ib.onrender.com/api/blogs/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!blog) return <p className="p-6">No blog found</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          By: {blog.author || 'Unknown'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Category: {blog.category || 'Uncategorized'}
        </p>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}
        <div className="whitespace-pre-line text-lg">{blog.content}</div>
      </div>
    </div>
  );
}

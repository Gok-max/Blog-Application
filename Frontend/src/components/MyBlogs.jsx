import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import DialogBox from './Alert';

import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function MyBlogs() {
  const { token } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [dialog, setDialog] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const res = await axios.get('https://blog3-g0ib.onrender.com/api/blogs/myblogs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyBlogs(res.data);
      } catch (err) {
        setDialog({
          show: true,
          title: 'Error',
          message: err.response?.data?.message || 'Failed to load your blogs',
          onConfirm: null,
          onCancel: null
        });
      }
    }
    fetchMyBlogs();
  }, [token]);

  const handleDelete = (id) => {
    setDialog({
      show: true,
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this blog?',
      onConfirm: () => confirmDelete(id),
      onCancel: () => setDialog({ ...dialog, show: false })
    });
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`https://blog3-g0ib.onrender.com/api/blogs/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBlogs(prev => prev.filter(blog => blog._id !== id));
      setDialog({
        show: true,
        title: 'Success',
        message: 'Blog deleted successfully!',
        onConfirm: null,
        onCancel: null
      });
    } catch (err) {
      setDialog({
        show: true,
        title: 'Error',
        message: err.response?.data?.message || 'Failed to delete blog',
        onConfirm: null,
        onCancel: null
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/blogs/view/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>

        {myBlogs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">You have no blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white dark:bg-gray-800 p-5 rounded shadow transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="font-medium">Category:</span> {blog.category}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DialogBox
        title={dialog.title}
        message={dialog.message}
        isOpen={dialog.show}
        onConfirm={dialog.onConfirm}
        onCancel={dialog.onCancel}
        onClose={() => setDialog({ ...dialog, show: false })}
      />
    </div>
  );
}

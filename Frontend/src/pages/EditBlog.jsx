// src/pages/EditBlogPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DialogBox from '../components/Alert';

export default function EditBlogPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: ''
  });

  const [dialog, setDialog] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blog3-g0ib.onrender.com/api/blogs/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          title: res.data.title || '',
          category: res.data.category || '',
          content: res.data.content || '',
          image: res.data.image || '',
        });
      } catch (err) {
        setDialog({
          show: true,
          title: 'Error',
          message: 'Unable to fetch blog data',
        });
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog3-g0ib.onrender.com/api/blogs/blogs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDialog({
        show: true,
        title: 'Success',
        message: 'Blog updated successfully!',
        onConfirm: () => {
          setDialog({ ...dialog, show: false });
          navigate('/myblogs');
        }
      });

    } catch (err) {
      setDialog({
        show: true,
        title: 'Error',
        message: err.response?.data?.message || 'Failed to update blog',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
              placeholder="Write your content here..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL (optional)</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>

      <DialogBox
        title={dialog.title}
        message={dialog.message}
        isOpen={dialog.show}
        onClose={() => {
          if (dialog.onConfirm) {
            dialog.onConfirm();
          } else {
            setDialog({ ...dialog, show: false });
          }
        }}
      />
    </div>
  );
}

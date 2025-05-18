import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DialogBox from '../components/Alert';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(''); // new state for image URL
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '' });

  const showDialog = (title, message) => {
    setDialog({ isOpen: true, title, message });
  };

  const closeDialog = () => {
    setDialog({ ...dialog, isOpen: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      showDialog('Missing Fields', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://blog3-g0ib.onrender.com/api/blogs/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category, image }), // include image here
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create blog');
      }

      showDialog('Success', 'Blog created successfully!');
      setTitle('');
      setContent('');
      setCategory('');
      setImage('');  // reset image field
    } catch (err) {
      console.error(err.message);
      showDialog('Error', err.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..."
              className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white min-h-[150px]"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>

      <DialogBox
        title={dialog.title}
        message={dialog.message}
        isOpen={dialog.isOpen}
        onClose={closeDialog}
      />
    </div>
  );
};

export default CreateBlog;

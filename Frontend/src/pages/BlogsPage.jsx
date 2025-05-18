import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogFilter from '../components/BlogFilter';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filter, setFilter] = useState({ author: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://blog3-g0ib.onrender.com/api/blogs/blogs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        alert('Unauthorized. Please log in again.');
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;

    if (filter.author.trim()) {
      result = result.filter(
        (blog) =>
          blog.author &&
          blog.author.toLowerCase().includes(filter.author.toLowerCase())
      );
    }

    if (filter.category.trim()) {
      result = result.filter(
        (blog) =>
          blog.category &&
          blog.category.toLowerCase().includes(filter.category.toLowerCase())
      );
    }

    setFilteredBlogs(result);
  }, [filter, blogs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Reset filters handler
  const resetFilter = () => {
    setFilter({ author: '', category: '' });
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
      
      <h2 className="text-3xl font-bold mb-6 text-center">All Blogs</h2>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
        <BlogFilter
          author={filter.author}
          category={filter.category}
          onChange={handleFilterChange}
          inputClassName="border border-blue-500 focus:ring focus:ring-blue-300 rounded px-3 py-2 text-gray-900 bg-white"
        />
        <button
          onClick={resetFilter}
          className="mt-3 md:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          aria-label="Reset Filters"
          type="button"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blogs/${blog._id}`)}
              className="cursor-pointer p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
              title="Click to read full blog"
            >
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm mb-1">
                <strong>By:</strong> {blog.author || 'Unknown'}
              </p>
              <p className="text-sm mb-1">
                <strong>Category:</strong> {blog.category || 'Uncategorized'}
              </p>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <p className="text-gray-100">
                {blog.content ? blog.content.slice(0, 150) : ''}
                {blog.content && blog.content.length > 150 ? '...' : ''}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No blogs found.</p>
        )}
      </div>
    </div>
    </>
    
  );
}

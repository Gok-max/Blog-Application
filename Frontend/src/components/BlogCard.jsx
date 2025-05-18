// src/components/BlogCard.jsx
import React from 'react';

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>By: {blog.author}</p>
      <p>Category: {blog.category}</p>
      {blog.image && <img src={blog.image} alt={blog.title} width="200" />}
      <p>{blog.content.slice(0, 100)}...</p>
    </div>
  );
}

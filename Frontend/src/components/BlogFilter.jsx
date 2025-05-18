// src/components/BlogFilter.jsx
import React from 'react';

export default function BlogFilter({ author, category, onChange, inputClassName }) {
  return (
    <div className="flex flex-col md:flex-row md:gap-4 w-full md:w-auto">
      <input
        type="text"
        name="author"
        value={author}
        onChange={onChange}
        placeholder="Filter by author"
        className={`${inputClassName} mb-3 md:mb-0 md:w-48`}
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={onChange}
        placeholder="Filter by category"
        className={`${inputClassName} md:w-48`}
      />
    </div>
  );
}

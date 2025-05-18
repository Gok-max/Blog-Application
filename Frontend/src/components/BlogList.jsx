// Example inside BlogsPage or BlogItem component
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function BlogItem({ blog, onDelete }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      {token && (
        <>
          <button onClick={() => navigate(`/blogs/edit/${blog._id}`)}>Edit</button>
          <button onClick={() => onDelete(blog._id)}>Delete</button>
        </>
      )}
    </div>
  );
}

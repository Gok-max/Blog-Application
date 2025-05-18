import { Routes, Route, Navigate } from 'react-router-dom';
import BlogsPage from './pages/BlogsPage';
import CreateBlogPage from './pages/CreateBlog';
import EditBlogPage from './pages/EditBlog';
import MyBlogs from './components/MyBlogs';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Signup from './pages/Signup';
import BlogDetailsPage from './components/BlogForm';


function AppRoutes() {
  const { token } = useAuth();

  return (
    <>
      
      <Routes>
      {/* <Route path="/" element={<Navigate to="/blogs" />} /> */}
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/create" element={token ? <CreateBlogPage /> : <Navigate to="/" />} />
      <Route path="/blogs/edit/:id" element={token ? <EditBlogPage /> : <Navigate to="/" />} />
      <Route path="/myblogs" element={token ? <MyBlogs /> : <Navigate to="/" />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blogs/:id" element={<BlogDetailsPage />} />
    </Routes>
    </>
   
  );
}

export default AppRoutes;

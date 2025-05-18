# Blog-Application
# 📝 Good Vibes Blog Platform

A full-stack blog platform built with **React**, **React Router**, **TailwindCSS**, and **Node.js/Express**. Users can view all blogs, manage their own posts, and toggle between dark and light mode.
---

## 🚀 Features

- 🔐 Authentication (Login / Signup)
- 📝 Create, Read, Update, Delete blogs
- 👤 User-specific blog management
- 🌙 Dark / Light mode toggle
- ⚙️ Responsive Navbar with Settings menu
- 🎨 Styled using TailwindCSS

---

## 📁 Project Structure
client/
├── public/
│ └── _redirects # Netlify routing support
├── src/
│ ├── components/ # Navbar, Blog Cards, etc.
│ ├── pages/ # Login, Signup, Blog pages
│ └── context/ # Auth context
└── package.json

server/
├── routes/
│ └── auth.js # Login & signup routes
├── models/
│ └── User.js # Mongoose User model
└── index.js # Main backend entry


---

## 🛠️ Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Gokul-full-stack/blog.git
cd blog
2. Install Dependencies
For the frontend:
bash
Copy
Edit
cd client
npm install
For the backend:
bash
Copy
Edit
cd server
npm install
🔑 Environment Variables
Create a .env file inside server/ with the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
▶️ Running the App Locally
1. Start the backend
bash
Copy
Edit
cd server
npm start
2. Start the frontend
In a separate terminal:

bash
Copy
Edit
cd client
npm start
⚙️ Netlify Deployment (Frontend)
Make sure to include a _redirects file in the public/ folder:

bash
Copy
Edit
/*    /index.html   200
This prevents 404 errors for routes like /blogs, /myblogs, etc.

📦 Render Deployment (Backend)
Use server/index.js as the entry point and make sure CORS is properly configured to allow requests from the Netlify frontend domain.

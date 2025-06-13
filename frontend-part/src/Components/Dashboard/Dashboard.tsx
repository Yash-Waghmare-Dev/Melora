import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostForm from '../Post/PostForm';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get username from navigation state or fallback
  const username = location.state?.username || 'JohnDoe';
  const email = `${username.toLowerCase()}@example.com`;
  const [posts, setPosts] = useState<{ title: string; desc: string }[]>([]);

  const handleCreatePost = (title: string, desc: string) => {
    setPosts([{ title, desc }, ...posts]);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Left Panel: User Profile */}
      <aside className="dashboard-left">
        <div className="profile-card">
          <div className="profile-avatar">{username[0]}</div>
          <div className="profile-info">
            <div className="profile-username">{username}</div>
            <div className="profile-email">{email}</div>
          </div>
        </div>
      </aside>

      {/* Center Panel: Post Creation and List */}
      <main className="dashboard-center">
        <PostForm onCreate={handleCreatePost} />
        <div className="post-list">
          {posts.map((post, idx) => (
            <div className="post-item" key={idx}>
              <div className="post-title">{post.title}</div>
              <div className="post-desc">{post.desc}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Panel: Logout */}
      <aside className="dashboard-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard: React.FC = () => {
  // Dummy user data (could be replaced with context or props)
  const [user] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
  });
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [posts, setPosts] = useState<{ title: string; desc: string }[]>([]);
  const navigate = useNavigate();

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postTitle && postDesc) {
      setPosts([{ title: postTitle, desc: postDesc }, ...posts]);
      setPostTitle('');
      setPostDesc('');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Left Panel: User Profile */}
      <aside className="dashboard-panel dashboard-left">
        <div className="profile-card">
          <div className="profile-avatar">{user.username[0]}</div>
          <div className="profile-info">
            <div className="profile-username">{user.username}</div>
            <div className="profile-email">{user.email}</div>
          </div>
        </div>
      </aside>

      {/* Center Panel: Post Creation */}
      <main className="dashboard-panel dashboard-center">
        <form className="post-form" onSubmit={handlePost}>
          <h2 className="post-form-title">Create Post</h2>
          <div className="form-group">
            <label htmlFor="postTitle" className="form-label">Title</label>
            <input
              id="postTitle"
              className="form-input"
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
              required
              placeholder="Enter post title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postDesc" className="form-label">Description</label>
            <textarea
              id="postDesc"
              className="form-input"
              value={postDesc}
              onChange={e => setPostDesc(e.target.value)}
              required
              placeholder="Enter post description"
              rows={4}
            />
          </div>
          <button type="submit" className="form-button">Post</button>
        </form>
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
      <aside className="dashboard-panel dashboard-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Dashboard;

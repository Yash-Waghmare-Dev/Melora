import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostForm from '../Post/PostForm';
import Logout from '../Logout/Logout';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const username = location.state?.username || 'JohnDoe';
  const email = `${username.toLowerCase()}@example.com`;
  const [posts, setPosts] = useState<{
    username: string;
    title: string;
    desc: string;
    image?: string;
    createdAt: string;
    likes: number;
    likedByUser: boolean;
    comments: { user: string; text: string; replies: { user: string; text: string }[] }[];
    showComments: boolean;
    newComment: string;
    replyInputs: string[];
    replyingTo: number | null;
  }[]>([]);

  const handleCreatePost = (title: string, desc: string, image?: string) => {
    setPosts([
      {
        username,
        title,
        desc,
        image,
        createdAt: new Date().toLocaleString(),
        likes: 0,
        likedByUser: false,
        comments: [],
        showComments: false,
        newComment: '',
        replyInputs: [],
        replyingTo: null,
      },
      ...posts,
    ]);
  };

  const handleLike = (idx: number) => {
    setPosts(posts => posts.map((post, i) =>
      i === idx
        ? {
            ...post,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
            likedByUser: !post.likedByUser,
          }
        : post
    ));
  };

  const handleToggleComments = (idx: number) => {
    setPosts(posts => posts.map((post, i) =>
      i === idx ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const handleCommentInput = (idx: number, value: string) => {
    setPosts(posts => posts.map((post, i) =>
      i === idx ? { ...post, newComment: value } : post
    ));
  };

  const handleAddComment = (idx: number) => {
    setPosts(posts => posts.map((post, i) =>
      i === idx && post.newComment.trim()
        ? {
            ...post,
            comments: [
              ...post.comments,
              { user: username, text: post.newComment, replies: [] },
            ],
            newComment: '',
            replyInputs: [...post.replyInputs, ''],
          }
        : post
    ));
  };

  const handleReplyInput = (postIdx: number, commentIdx: number, value: string) => {
    setPosts(posts => posts.map((post, i) => {
      if (i !== postIdx) return post;
      const replyInputs = [...(post.replyInputs || [])];
      replyInputs[commentIdx] = value;
      return { ...post, replyInputs };
    }));
  };

  const handleAddReply = (postIdx: number, commentIdx: number) => {
    setPosts(posts => posts.map((post, i) => {
      if (i !== postIdx) return post;
      const replyText = post.replyInputs?.[commentIdx] || '';
      if (!replyText.trim()) return post;
      const comments = post.comments.map((c, j) =>
        j === commentIdx
          ? { ...c, replies: [...c.replies, { user: username, text: replyText }] }
          : c
      );
      const replyInputs = [...(post.replyInputs || [])];
      replyInputs[commentIdx] = '';
      return { ...post, comments, replyInputs };
    }));
  };

  const handleLogout = () => {
    setPosts([]); // Clear posts
    // In a real app, also clear user context/state here
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
        <h1 className="app-title">Melora</h1>
        <PostForm onCreate={handleCreatePost} />
        <div className="post-list">
          {posts.map((post, idx) => (
            <div className="post-item" key={idx}>
              <div className="post-header">
                <span className="post-username">{post.username}</span>
                <span className="post-time">{post.createdAt}</span>
              </div>
              <div className="post-title">{post.title}</div>
              <div className="post-desc">{post.desc}</div>
              {post.image && (
                <img src={post.image} alt="Post" className="post-image" />
              )}
              <div className="post-actions">
                <button className="post-action-btn" onClick={() => handleLike(idx)}>
                  {post.likedByUser ? 'Unlike' : 'Like'} ({post.likes})
                </button>
                <button className="post-action-btn" onClick={() => handleToggleComments(idx)}>
                  Comment ({post.comments.length})
                </button>
                <button className="post-action-btn">Share</button>
              </div>
              {post.showComments && (
                <div className="post-comments">
                  <div className="add-comment">
                    <input
                      className="comment-input"
                      type="text"
                      value={post.newComment}
                      onChange={e => handleCommentInput(idx, e.target.value)}
                      placeholder="Add a comment..."
                    />
                    <button className="comment-btn" onClick={() => handleAddComment(idx)} type="button">
                      Add
                    </button>
                  </div>
                  {post.comments.map((comment, cIdx) => (
                    <div className="comment-item" key={cIdx}>
                      <span className="comment-user">{comment.user}:</span> {comment.text}
                      <div className="replies">
                        {comment.replies.map((reply, rIdx) => (
                          <div className="reply-item" key={rIdx}>
                            <span className="reply-user">{reply.user}:</span> {reply.text}
                          </div>
                        ))}
                        <div className="add-reply">
                          <input
                            className="reply-input"
                            type="text"
                            value={post.replyInputs?.[cIdx] || ''}
                            onChange={e => handleReplyInput(idx, cIdx, e.target.value)}
                            placeholder="Reply..."
                          />
                          <button className="reply-btn" onClick={() => handleAddReply(idx, cIdx)} type="button">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Right Panel: Logout */}
      <aside className="dashboard-right">
        <Logout onLogout={handleLogout} />
      </aside>
    </div>
  );
};

export default Dashboard;

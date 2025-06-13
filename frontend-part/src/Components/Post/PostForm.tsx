import React, { useState } from 'react';
import './PostForm.css';

interface PostFormProps {
  onCreate: (title: string, desc: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onCreate }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postTitle && postDesc) {
      onCreate(postTitle, postDesc);
      setPostTitle('');
      setPostDesc('');
    }
  };

  return (
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
  );
};

export default PostForm;

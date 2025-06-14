import React, { useState } from 'react';
import './PostForm.css';

interface PostFormProps {
  onCreate: (title: string, desc: string, image?: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onCreate }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postImage, setPostImage] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPostImage(undefined);
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postTitle && postDesc) {
      onCreate(postTitle, postDesc, postImage);
      setPostTitle('');
      setPostDesc('');
      setPostImage(undefined);
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
      <div className="image-upload-group">
        <label htmlFor="postImage" className="image-upload-label">
          <span role="img" aria-label="Upload">📷</span> Upload Image
          <input
            id="postImage"
            className="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        {postImage && (
          <img src={postImage} alt="Preview" className="post-image-preview" />
        )}
      </div>
      <button type="submit" className="form-button">Post</button>
    </form>
  );
};

export default PostForm;

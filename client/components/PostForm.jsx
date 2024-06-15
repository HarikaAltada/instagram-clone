import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onNewPost }) => {
  const [authorName, setAuthorName] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("authorPhoto", authorPhoto);
    formData.append("postContent", postContent);
    formData.append("postPhoto", postPhoto);
    formData.append("postDate", new Date().toISOString());

    try {
      const response = await axios.post(
        "http://localhost:4000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onNewPost(response.data);

      setAuthorName("");
      setAuthorPhoto(null);
      setPostContent("");
      setPostPhoto(null);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />

      <label>Profile Photo</label>
      <input
        type="file"
        onChange={(e) => setAuthorPhoto(e.target.files[0])}
        required
      />

      <label>Post Content</label>
      <textarea
        placeholder="Post Content"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        required
      />

      <label>Post Photo</label>
      <input
        type="file"
        onChange={(e) => setPostPhoto(e.target.files[0])}
        required
      />

      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;

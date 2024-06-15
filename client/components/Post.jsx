import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Post = ({ post, onDelete }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  useEffect(() => {
    socket.on(`post-${post._id}-like`, (updatedLikes) => {
      setLikes(updatedLikes);
    });
    socket.on(`post-${post._id}-comment`, (updatedComments) => {
      setComments(updatedComments);
    });

    return () => {
      socket.off(`post-${post._id}-like`);
      socket.off(`post-${post._id}-comment`);
    };
  }, [post._id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/posts/${post._id}/like`
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/posts/${post._id}/comment`,
        {
          text: newComment,
        }
      );
      setComments(response.data.comments);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${post._id}`);
      onDelete(post._id); // Notify parent component to remove the post
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const toggleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };
  return (
    <div className="post">
      <div className="info">
        <div className="user">
          <div className="profile-pic">
            <img
              src={`http://localhost:4000/${post.authorPhoto}`}
              alt={post.authorName}
            />
          </div>
          <p className="username">{post.authorName}</p>
        </div>
        <div className="dropdown">
          <a
            className="dropdown-toggle"
            href="#"
            onClick={handleDropdownToggle}
          >
            <img
              src="./img/icons8-ellipsis-30.png"
              alt=""
              style={{ width: "20px", height: "20px" }} // Inline styles to reduce size
            />
          </a>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                Delete
              </a>
            </div>
          )}
        </div>
      </div>
      <img
        src={`http://localhost:4000/${post.postPhoto}`}
        className="post-image"
        alt="Post"
      />
      <div className="post-content">
        <div className="reaction-wrapper">
          <img src="img/like.PNG" onClick={handleLike} className="icon" />
          <img
            src="./img/comment.PNG"
            alt=""
            className="icon"
            onClick={toggleCommentsVisibility}
          />
          <img src="./img/save.PNG" alt="" className="icon" />
          <img src="./img/send.PNG" alt="" className="icon" />
        </div>
        <p className="likes">{likes} likes</p>
        <p className="description">
          <span>{post.authorName}</span> {post.postContent}
        </p>
        <p className="post-time">
          {new Date(post.postDate).toLocaleDateString()}
        </p>
        {isCommentsVisible && (
          <>
            <div className="comments">
              {comments.map((comment, index) => (
                <p key={index}>{comment.text}</p>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="comment-wrapper">
              <img src="./img/smile.PNG" alt="" className="icon" />
              <input
                type="text"
                className="comment-box"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit" className="comment-btn">
                Post
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;

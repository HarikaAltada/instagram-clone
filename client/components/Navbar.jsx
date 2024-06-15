"use client";

import React from "react";

const Navbar = ({ onAddPostClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <img src="./img/logo.PNG" className="ins-img" alt="Instagram Logo" />
        <input type="text" className="search-box" placeholder="Search" />
        <div className="nav-items">
          <img src="./img/home.PNG" className="icon" alt="Home" />
          <img src="./img/comment.PNG" className="icon" alt="Messenger" />
          <img
            src="./img/add.PNG"
            className="icon"
            alt="Add Post"
            onClick={onAddPostClick}
          />
          <img src="./img/explore.PNG" className="icon" alt="Explore" />
          <img src="./img/like.PNG" className="icon" alt="Likes" />
          <div className="icon user-profile"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

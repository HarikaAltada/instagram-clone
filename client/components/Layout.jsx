import React, { useState } from "react";
import Navbar from "./Navbar";
import Stories from "./Stories";
import PostForm from "./PostForm";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Layout = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPost, setNewPost] = useState(null);

  const handleNewPost = (post) => {
    setNewPost(post);
    setIsFormOpen(false);
  };

  return (
    <>
      <Navbar onAddPostClick={() => setIsFormOpen(true)} />
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create Post
          <IconButton
            aria-label="close"
            onClick={() => setIsFormOpen(false)}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PostForm onNewPost={handleNewPost} />
        </DialogContent>
      </Dialog>
      <Stories onNewPost={newPost} />
      <main className="main">
        <div className="wrapper">{children}</div>
      </main>
    </>
  );
};

export default Layout;

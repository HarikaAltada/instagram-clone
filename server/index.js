const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const Post = require("./Model/User"); // Import the Post model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/instagram-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
app.post(
  "/api/posts",
  upload.fields([
    { name: "authorPhoto", maxCount: 1 },
    { name: "postPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { authorName, postContent, postDate } = req.body;
      const authorPhoto = req.files["authorPhoto"][0].path;
      const postPhoto = req.files["postPhoto"][0].path;

      const newPost = new Post({
        authorName,
        authorPhoto,
        postContent,
        postPhoto,
        postDate,
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to like a post
app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.likes += 1;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to add a comment to a post
app.post("/api/posts/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = {
      text: req.body.text,
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

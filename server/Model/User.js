const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  authorName: String,
  authorPhoto: String,
  postPhoto: String,
  postContent: String,
  postDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

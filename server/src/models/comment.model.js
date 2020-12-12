const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      createdById: String,
      content: String,
    },
    { timestamps: true }
  )
);

module.exports = Comment;

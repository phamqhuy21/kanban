const mongoose = require("mongoose");

const Card = mongoose.model(
  "Card",
  new mongoose.Schema(
    {
      createdById: String,
      title: String,
      description: String,
      labels: [],
      members: [],
      background: String,
      files: [],
      comments: [],
      actions: [],
      deadline: Date,
      timer: Number,
    },
    { timestamps: true }
  )
);

module.exports = Card;

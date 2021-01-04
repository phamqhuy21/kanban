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
      comment: [],
      actions: [],
      deadline: Date,
    },
    { timestamps: true }
  )
);

module.exports = Card;

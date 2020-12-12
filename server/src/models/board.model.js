const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema(
    {
      members: [],
      adminId: String,
      createdById: String,
      title: String,
      lists: [],
    },
    { timestamps: true }
  )
);

module.exports = Board;

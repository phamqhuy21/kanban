const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema(
    {
      member: [],
      adminId: String,
      createdById: String,
      title: String,
      lists: [],
    },
    { timestamps: true }
  )
);

module.exports = Board;

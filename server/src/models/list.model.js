const mongoose = require("mongoose");

const List = mongoose.model(
  "List",
  new mongoose.Schema(
    {
      createdById: String,
      title: String,
      cards: [],
    },
    { timestamps: true }
  )
);

module.exports = List;

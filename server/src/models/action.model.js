const mongoose = require("mongoose");

const Action = mongoose.model(
  "Action",
  new mongoose.Schema(
    {
      createdById: String,
      card: String,
      action: String,
    },
    { timestamps: true }
  )
);

module.exports = Action;

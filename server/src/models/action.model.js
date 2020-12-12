const mongoose = require("mongoose");

const Action = mongoose.model(
  "Action",
  new mongoose.Schema({
    createdById: String,
    action: String,
  })
);

module.exports = Action;

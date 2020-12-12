const mongoose = require("mongoose");

const Label = mongoose.model(
  "Label",
  new mongoose.Schema({
    createdById: String,
    title: String,
    color: String,
  })
);

module.exports = Label;

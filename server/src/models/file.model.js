const mongoose = require("mongoose");

const File = mongoose.model(
  "File",
  new mongoose.Schema(
    {
      createdById: String,
      fileName: String,
      url: String,
    },
    { timestamps: true }
  )
);

module.exports = File;

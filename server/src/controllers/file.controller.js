const { mongoose, label } = require("../models");
const db = require("../models");
const Card = require("../models/card.model");
const File = require("../models/file.model");

const BASE = "http://localhost:4000";

exports.uploadImage = async (req, res) => {
  let { cardId } = req.query;
  let { originalname } = req.file;
  try {
    let file = await new File({
      createdById: req.userId,
      fileName: originalname,
      url: `${BASE}/file/${originalname}`,
    });
    await file.save((err, file) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (file) {
        return;
      }
    });
    let card = await Card.findByIdAndUpdate(
      cardId,
      {
        background: file._id.toString(),
      },
      { new: true, useFindAndModify: false }
    );
    if (card) {
      return res.status(200).json({
        message: "upload file successfully",
        data: file,
      });
    } else {
      return res.status(400).json("bad request");
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.uploadFile = async (req, res) => {
  let { cardId } = req.query;
  let { originalname } = req.file;
  try {
    let file = await new File({
      createdById: req.userId,
      fileName: originalname,
      url: `${BASE}/file/${originalname}`,
    });
    await file.save((err, file) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (file) {
        return;
      }
    });
    let card = await Card.findByIdAndUpdate(
      cardId,
      {
        $push: {
          files: file._id.toString(),
        },
      },
      { new: true, useFindAndModify: false }
    );
    if (card) {
      return res.status(200).json({
        message: "upload file successfully",
        data: file,
      });
    } else {
      return res.status(400).json("bad request");
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

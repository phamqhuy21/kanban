const { mongoose } = require("../models");
const db = require("../models");
const Card = require("../models/card.model");
const Board = db.board;
const Label = db.label;

exports.createLabel = async (req, res) => {
  let { boardId, cardId, data } = req.body;
  try {
    let label = await new Label({
      boardId: boardId || null,
      createdById: req.userId,
      title: data.title || null,
      color: data.color,
    });
    await label.save((err, label) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (label) {
        return;
      }
    });
    let board = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: {
          labels: label._id.toString(),
        },
      },
      { new: true, useFindAndModify: false }
    ).lean();
    let card = await Card.findByIdAndUpdate(
      cardId,
      {
        $push: {
          labels: label._id.toString(),
        },
      },
      { new: true, useFindAndModify: false }
    ).lean();

    if (card && board) {
      return res.status(200).json({ message: "add label successfully" });
    } else return res.status(400).json({ message: "bad request" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.updateLabel = async (req, res) => {
  const { data } = req.body;
  const { labelId } = req.params;
  try {
    let label = await Label.findByIdAndUpdate(labelId, data, {
      new: true,
      useFindAndModify: false,
    }).lean();
    if (label) {
      return res.status(200).json({ message: "update label successfully" });
    } else return res.status(400).json({ message: "bad request" });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

exports.getLabelsBoard = async (req, res) => {
  const { boardId } = req;
  try {
    let board = await Board.findById(boardId).lean();
    let labels = [];
    if (board) {
      for (let i = 0; i < board.labels.length; i++) {
        let dataLabel = await Label.findById(board.labels[i]);
        labels.push({
          _id: dataLabel._id,
          createdById: dataLabel.createdById,
          title: dataLabel.title,
          color: dataLabel.color,
        });
      }
      return res.status(200).json({
        message: "get labels in board successfully",
        data: labels,
      });
    } else
      return res.status(400).json({
        message: "Bad request",
      });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

exports.deleteLabel = async (req, res) => {
  const { boardId } = req.body;
  const { labelId } = req.params;
  try {
    let board = await Board.findByIdAndUpdate(
      boardId,
      {
        $pull: {
          labels: labelId,
        },
      },
      { useFindAndModify: false, new: true }
    ).lean();
    let label = await Label.findByIdAndRemove(labelId, {
      useFindAndModify: false,
    }).lean();
    if (board && label) {
      return res.json({
        message: "Label was deleted successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Cannot delete label",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

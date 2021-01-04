const { mongoose, label } = require("../models");
const db = require("../models");
const Board = db.board;
const Card = db.card;
const Action = db.action;

exports.createAction = async (req, res) => {
  try {
    let { userId } = req;
    let { boardId, cardId, data } = req.body;
    let dataReq = {
      createdById: userId,
      action: data.action,
    };
    if (cardId) {
      dataReq.card = cardId;
    }
    let action = await new Action(dataReq);
    await action.save((err, action) => {
      if (action) {
        return;
      }
    });
    let board = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: {
          actions: action._id.toString(),
        },
      },
      { new: true, useFindAndModify: false }
    ).lean();
    if (cardId) {
      await Card.findByIdAndUpdate(
        cardId,
        {
          $push: {
            actions: action._id.toString(),
          },
        },
        { new: true, useFindAndModify: false }
      ).lean();
    }
    if (board) {
      return res.status(200).json({
        message: "add action successfully",
      });
    } else {
      return res.status(400).json({
        message: "bad request",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

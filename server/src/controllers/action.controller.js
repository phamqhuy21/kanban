const db = require("../models");
const { findOne } = require("../models/user.model");
const Board = db.board;
const Card = db.card;
const Action = db.action;
const User = db.user;

exports.createAction = async (req, res) => {
  try {
    let { userId } = req;
    let { boardId, cardId, data } = req.body;
    let dataReq = {
      createdById: userId,
      action: data.action,
      board: boardId,
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

exports.getActionUser = async (req, res) => {
  try {
    let { userId } = req;
    let action = await Action.find({ createdById: userId }).lean();
    let user = await User.findById(userId).lean();
    user = {
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      alias: user.fullname.substring(0, 2).toUpperCase(),
    };
    let actionRes = [];
    for (let i = 0; i < action.length; i++) {
      let boardAction = await Board.findById(action[i].board).lean();
      let board = { _id: boardAction._id, title: boardAction.title };
      if (action[i].card) {
        let cardAction = await Card.findById(action[i].card).lean();
        let card = { _id: cardAction._id, title: cardAction.title };
        actionRes.push({ ...action[i], createdById: user, board, card });
      } else {
        actionRes.push({ ...action[i], createdById: user, board });
      }
    }
    return res.status(200).json({
      message: "get action successfully",
      data: actionRes,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

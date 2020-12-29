const db = require("../models");
const Board = db.board;
const User = db.user;
const List = db.list;
const Card = db.card;

exports.createBoard = (req, res) => {
  const board = new Board({
    createdById: req.userId,
    adminId: req.userId,
    title: req.body.title,
    backgroundColor: req.body.color,
    members: [req.userId],
  });
  board.save((err, board) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json({
      id: board._id,
    });
  });
};

exports.addMemberBoard = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Board.findByIdAndUpdate(
    id,
    {
      $push: {
        members: req.memberId,
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "Cannot update board",
        });
        return;
      } else res.json({ message: "Board updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating Board",
      });
      return;
    });
};

exports.getDetailBoard = async (req, res) => {
  try {
    let board = await Board.findById(req.params.id).lean();
    let admin = await User.findById(board.adminId).lean();
    let creater = await User.findById(board.createdById).lean();
    let members = [];
    let lists = [];
    let cards = [];
    for (let i = 0; i < board.members.length; i++) {
      let dataMember = await User.findById(board.members[i]);
      members.push({
        fullname: dataMember.fullname,
        username: dataMember.username,
        email: dataMember.email,
        alias: dataMember.username.substring(0, 2).toUpperCase(),
      });
    }
    for (let i = 0; i < board.lists.length; i++) {
      let dataList = await List.findById(board.lists[i]).lean();
      if (dataList.cards.length > 0) {
        for (let j = 0; j < dataList.cards.length; j++) {
          let dataCard = await Card.findById(dataList.cards[j]).lean();
          cards.push(dataCard);
        }
        dataList = { ...dataList, cards };
      }
      lists.push(dataList);
    }

    let data = await {
      title: board.title,
      backgroundColor: board.backgroundColor,
      admin: {
        fullname: admin.fullname,
        username: admin.username,
        email: admin.email,
        alias: admin.username.substring(0, 2).toUpperCase(),
      },
      createdBy: {
        fullname: creater.fullname,
        username: creater.username,
        email: creater.email,
        alias: creater.username.substring(0, 2).toUpperCase(),
      },
      members,
      lists,
    };
    res.status(200).json({
      code: 200,
      data: data,
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

exports.getBoards = async (req, res) => {
  try {
    let userId = req.userId;
    let boards = await Board.find({
      members: userId,
    }).lean();
    return res.status(200).json({
      status: 200,
      data: boards,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const db = require("../models");
const Board = db.board;
const User = db.user;

exports.createBoard = (req, res) => {
  const board = new Board({
    createdById: req.userId,
    adminId: req.userId,
    title: req.body.title,
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
        member: req.memberId,
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update board",
        });
        return;
      } else res.send({ message: "Board updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
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
    let member = [];
    for (let i = 0; i < board.members.length; i++) {
      let dataMember = await User.findById(board.members[i]);
      member.push({
        username: dataMember.username,
        email: dataMember.email,
      });
    }
    let data = {
      title: board.title,
      admin: {
        username: admin.username,
        email: admin.email,
      },
      createdBy: {
        username: creater.username,
        email: creater.email,
      },
      member,
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

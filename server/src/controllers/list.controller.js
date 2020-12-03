const db = require("../models");
const Board = db.board;
const User = db.user;
const List = db.list;

exports.createList = async (req, res) => {
  const list = await new List({
    createdById: req.userId,
    title: req.body.title,
    card: [],
  });
  await list.save((err, list) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json({
      code: 200,
      message: "Add list success",
    });
  });
  const boardId = req.body.boardId;
  await Board.findByIdAndUpdate(
    boardId,
    {
      $push: {
        lists: list._id,
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
      return res.status(500).send({ message: err });
    });
};

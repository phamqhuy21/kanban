const db = require("../models");
const Board = db.board;
const List = db.list;

exports.createList = async (req, res) => {
  const boardId = req.boardId;
  const list = await new List({
    createdById: req.userId,
    title: req.body.title,
  });
  await list.save((err, list) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (list) {
      return;
    }
  });
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
      } else
        res.status(200).json({
          code: 200,
          message: "Add list and update board successfully",
        });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

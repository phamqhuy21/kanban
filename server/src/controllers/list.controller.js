const { mongoose, card } = require("../models");
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
        lists: list._id.toString(),
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

exports.deleteListInBoard = async (req, res) => {
  //   let listId = mongoose.Types.ObjectId(req.params.id);
  let listId = req.params.id;
  let boardId = req.query.boardId;

  try {
    let board = await Board.findByIdAndUpdate(
      boardId,
      {
        $pull: {
          lists: listId,
        },
      },
      { useFindAndModify: false, new: true }
    ).lean();
    let list = await List.findByIdAndRemove(listId, {
      useFindAndModify: false,
    }).lean();
    if (board && list) {
      return res.json({
        message: "List was deleted successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Cannot delete List",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.updatePositionCardInList = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  let { data } = req.body;
  let { listSourceId, listDestinationId, listId } = req.body;
  if (!listId) {
    let listSource = await List.findByIdAndUpdate(
      listSourceId,
      data.listCardsSource,
      {
        new: true,
        useFindAndModify: false,
      }
    ).lean();
    let listDestination = await List.findByIdAndUpdate(
      listDestinationId,
      data.listCardsDestination,
      {
        new: true,
        useFindAndModify: false,
      }
    ).lean();
    if (listSource && listDestination) {
      return res.status(200).json({
        message: "Update position cards in lists successfully !",
      });
    } else {
      return res.status(404).json({
        message: "Cannot update position cards in lists",
      });
    }
  } else {
    let list = await List.findByIdAndUpdate(listId, data.list, {
      new: true,
      useFindAndModify: false,
    }).lean();
    if (list) {
      return res.status(200).json({
        message: "Update position cards in lists successfully !",
      });
    } else {
      return res.status(404).json({
        message: "Cannot update position cards in lists",
      });
    }
  }
};

exports.updateList = async (req, res) => {
  let { listId, data } = req.body;
  if (listId) {
    let list = await List.findByIdAndUpdate(listId, data, {
      new: true,
      useFindAndModify: false,
    }).lean();
    if (list) {
      return res.status(200).json({
        message: "Update list successfully",
      });
    } else
      return res.status(400).json({
        message: "Update list failed",
      });
  }
};

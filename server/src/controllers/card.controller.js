const db = require("../models");
const List = db.list;
const Card = db.card;
const File = db.file;
const Label = db.label;
const User = db.user;

exports.createCard = async (req, res) => {
  const listId = req.body.listId;
  const card = await new Card({
    createdById: req.userId,
    title: req.body.data.title || "",
    description: req.body.data.description || "",
    background: req.body.data.background || "",
    deadline: req.body.data.deadline || null,
  });
  await card.save((err, card) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (card) {
      return;
    }
  });
  await List.findByIdAndUpdate(
    listId,
    {
      $push: {
        cards: card._id.toString(),
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update List",
        });
        return;
      } else
        res.status(200).json({
          code: 200,
          message: "Add card and update list successfully",
          data: card,
        });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

exports.updateCard = async (req, res) => {
  let { cardId, data } = req.body;
  if (cardId) {
    try {
      let list = await Card.findByIdAndUpdate(cardId, data, {
        new: true,
        useFindAndModify: false,
      }).lean();
      if (list) {
        return res.status(200).json({
          message: "Update card successfully",
        });
      } else
        return res.status(400).json({
          message: "Update card failed",
        });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
};

exports.deleteCard = async (req, res) => {
  let { listId } = req.body;
  let { cardId } = req.params;

  try {
    let list = await List.findByIdAndUpdate(
      listId,
      {
        $pull: {
          cards: cardId,
        },
      },
      { useFindAndModify: false, new: true }
    ).lean();
    let card = await Card.findByIdAndRemove(cardId, {
      useFindAndModify: false,
    }).lean();
    if (card && list) {
      return res.json({
        message: "Card was deleted successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Cannot delete card",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDetailCard = async (req, res) => {
  let { cardId } = req.query;
  try {
    let card = await Card.findById(cardId).lean();
    if (card) {
      let members = [];
      let files = [];
      let labels = [];
      let background = "";
      for (let i = 0; i < card.members.length; i++) {
        let dataMember = await User.findById(card.members[i]).lean();
        members.push({
          ...dataMember,
          alias: dataMember.fullname.substring(0, 2).toUpperCase(),
        });
      }
      for (let i = 0; i < card.files.length; i++) {
        let dataFile = await File.findById(card.files[i]).lean();
        files.push(dataFile);
      }
      for (let i = 0; i < card.labels.length; i++) {
        let dataLabel = await Label.findById(card.labels[i]).lean();
        labels.push(dataLabel);
      }
      if (card.background.length > 0) {
        background = await File.findById(card.background).lean();
      }
      card = { ...card, members, files, labels, background };

      return res.status(200).json({
        message: "get card task successfully",
        data: card,
      });
    } else
      return res.status(404).json({
        message: "can not find card task",
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

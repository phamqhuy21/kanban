const { action } = require("../models");
const db = require("../models");
const Action = require("../models/action.model");
const List = db.list;
const Card = db.card;
const File = db.file;
const Label = db.label;
const User = db.user;
const Comment = db.comment;
const ACtion = db.action;

exports.createCard = async (req, res) => {
  try {
    const listId = req.body.listId;
    const card = await new Card({
      createdById: req.userId,
      title: req.body.data.title || "",
      description: req.body.data.description || "",
      background: req.body.data.background || "",
      deadline: req.body.data.deadline || null,
      ...req.body.data,
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
    if (typeof req.body.position !== undefined) {
      let listFilter = await List.findById(listId).lean();
      let newCards = listFilter.cards;
      await newCards.splice(req.body.position, 0, card._id.toString());
      let list = await List.findByIdAndUpdate(
        listId,
        {
          cards: newCards,
        },
        { new: true, useFindAndModify: false }
      ).lean();
      if (list) {
        return res.status(200).json({
          code: 200,
          message: "Add card and update list successfully",
          data: card,
        });
      } else
        return res.status(400).json({
          message: "bad request",
        });
    } else {
      console.log("huhu");
      let list = await List.findByIdAndUpdate(
        listId,
        {
          $push: {
            cards: card._id.toString(),
          },
        },
        { new: true, useFindAndModify: false }
      ).lean();
      if (list) {
        return res.status(200).json({
          code: 200,
          message: "Add card and update list successfully",
          data: card,
        });
      } else
        return res.status(400).json({
          message: "bad request",
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
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
      let comments = [];
      let actions = [];
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
      for (let i = 0; i < card.comments.length; i++) {
        let dataComment = await Comment.findById(card.comments[i]).lean();
        let userComment = await User.findById(dataComment.createdById).lean();
        userComment = {
          ...userComment,
          alias: userComment.fullname.substring(0, 2).toUpperCase(),
        };
        comments.push({ ...dataComment, createdById: userComment });
      }
      for (let i = 0; i < card.labels.length; i++) {
        let dataLabel = await Label.findById(card.labels[i]).lean();
        labels.push(dataLabel);
      }
      for (let i = 0; i < card.actions.length; i++) {
        let dataAction = await Action.findById(card.actions[i]).lean();
        let userAction = await User.findById(dataAction.createdById).lean();
        userAction = {
          ...userAction,
          alias: userAction.fullname.substring(0, 2).toUpperCase(),
        };
        actions.push({ ...dataAction, createdById: userAction });
      }
      actions.reverse();
      if (card.background.length > 0) {
        background = await File.findById(card.background).lean();
      }
      card = { ...card, members, files, labels, background, comments, actions };

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

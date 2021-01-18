const db = require("../models");
const Card = db.card;
const Comment = db.comment;

exports.createComment = async (req, res) => {
  try {
    let { userId } = req;
    let { cardId, data } = req.body;
    let dataReq = {
      createdById: userId,
      content: data.comment,
    };
    let comment = await new Comment(dataReq);
    await comment.save((err, comment) => {
      if (comment) {
        return;
      }
    });
    let card = await Card.findByIdAndUpdate(
      cardId,
      {
        $push: {
          comments: comment._id.toString(),
        },
      },
      { new: true, useFindAndModify: false }
    ).lean();
    if (card) {
      return res.status(200).json({
        message: "add comment successfully",
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

exports.updateComment = async (req, res) => {
  try {
    // let { userId } = req;
    let { commentId } = req.params;
    let { data } = req.body;
    let comment = await Comment.findByIdAndUpdate(commentId, data, {
      new: true,
      useFindAndModify: false,
    }).lean();
    if (comment) {
      return res.status(200).json({
        message: "update comment successfully",
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

exports.deleteComment = async (req, res) => {
  let { cardId } = req.body;
  let { commentId } = req.params;

  try {
    let card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: {
          comments: commentId,
        },
      },
      { useFindAndModify: false, new: true }
    ).lean();
    let comment = await Comment.findByIdAndRemove(commentId, {
      useFindAndModify: false,
    }).lean();
    if (card && comment) {
      return res.json({
        message: "Comment was deleted successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Cannot delete comment",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

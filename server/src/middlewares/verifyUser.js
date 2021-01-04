const db = require("../models");
const User = db.user;
const Board = db.board;

checkUserExisted = (req, res, next) => {
  if (req.body.email) {
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        req.memberId = user.id;
        next();
      } else return res.status(404).json({ message: "user not found" });
    });
  } else next();
};

checkUserIsMemberBoard = async (req, res, next) => {
  if (req.body.email) {
    let user = await User.findOne({
      email: req.body.email,
    }).lean();
    let board = await Board.find({
      _id: req.params.id,
      members: { $in: "" + user._id },
    }).lean();
    if (board.length > 0) {
      res.status(400).json({ message: "email already exists!" });
    } else next();
  } else next();
};

const verifyUser = {
  checkUserExisted,
  checkUserIsMemberBoard,
};

module.exports = verifyUser;

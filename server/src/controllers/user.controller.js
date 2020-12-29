const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = async (req, res) => {
  let user = await User.findById(req.userId).lean();
  res.status(200).json({
    user: {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      alias: user.username.substring(0, 2).toUpperCase(),
      email: user.email,
    },
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

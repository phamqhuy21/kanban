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
      alias: user.fullname.substring(0, 2).toUpperCase(),
      email: user.email,
    },
  });
};

exports.updateUser = async (req, res) => {
  try {
    let { userId } = req;
    let { username, email, fullname } = req.body;
    let user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (user) {
      return res.status(200).json({
        message: "update user success",
        data: user,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

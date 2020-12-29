const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  //Username
  let checkUsername = await User.findOne({
    username: req.body.username,
  }).lean();
  //Email
  let checkEmail = await User.findOne({
    email: req.body.email,
  }).lean();

  if (checkUsername && checkEmail) {
    return res.status(400).json({
      message: "Username and email is already in user!",
    });
  } else {
    if (checkUsername) {
      return res.status(400).json({
        message: "Username is already in user!",
      });
    }
    if (checkEmail) {
      return res.status(400).json({
        message: "Email is already in user!",
      });
    }
    next();
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;

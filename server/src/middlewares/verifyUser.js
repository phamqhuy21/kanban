const db = require("../models");
const User = db.user;

checkUserExisted = (req, res, next) => {
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
    }
  });
};

const verifyUser = {
  checkUserExisted,
};

module.exports = verifyUser;

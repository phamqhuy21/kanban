const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Board = db.board;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthenticated!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

isMemberBoard = (req, res, next) => {
  let boardId = req.params.id || req.query.boardId;
  let userId = req.userId;
  Board.findById(boardId).exec((err, board) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (board) {
      let filter = board.members.filter((member) => member === userId);
      if (filter.length > 0) {
        req.boardId = boardId;
        next();
        return;
      } else {
        res.status(403).send({ message: "Unauthorized!" });
        return;
      }
    } else {
      res.status(404).json({ code: 404, message: "Can not find board" });
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isMemberBoard,
};

module.exports = authJwt;

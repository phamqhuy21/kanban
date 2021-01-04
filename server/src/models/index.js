const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.board = require("./board.model");
db.list = require("./list.model");
db.card = require("./card.model");
db.label = require("./label.model");
db.comment = require("./comment.model");
db.file = require("./file.model");
db.action = require("./action.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

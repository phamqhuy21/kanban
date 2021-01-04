module.exports = (app) => {
  require("./auth.routes")(app);
  require("./user.routes")(app);
  require("./board.routes")(app);
  require("./list.routes")(app);
  require("./card.routes")(app);
  require("./label.routes")(app);
  require("./file.routes")(app);
  require("./action.routes")(app);
};

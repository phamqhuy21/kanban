module.exports = (app) => {
  require("./auth.routes")(app);
  require("./user.routes")(app);
  require("./board.routes")(app);
  require("./list.routes")(app);
  require("./card.routes")(app);
};

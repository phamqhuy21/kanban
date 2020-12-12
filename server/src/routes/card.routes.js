const { authJwt } = require("../middlewares");
const controller = require("../controllers/card.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/card/create",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.createCard
  );
};

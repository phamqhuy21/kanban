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
    "/api/v1/card",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.createCard
  );

  app.put(
    "/api/v1/card/update",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.updateCard
  );

  app.delete(
    "/api/v1/card/:cardId",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.deleteCard
  );

  app.get(
    "/api/v1/card",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.getDetailCard
  );
};

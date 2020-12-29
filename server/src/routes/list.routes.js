const { authJwt } = require("../middlewares");
const controller = require("../controllers/list.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/list/create",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.createList
  );

  app.delete("/api/v1/list/:id", [authJwt.verifyToken], controller.deleteList);
};

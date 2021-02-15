const { authJwt } = require("../middlewares");
const controller = require("../controllers/action.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/action",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.createAction
  );

  app.get("/api/v1/action", [authJwt.verifyToken], controller.getActionUser);
};

const { authJwt } = require("../middlewares");
const controller = require("../controllers/label.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/label", [authJwt.verifyToken], controller.createLabel);

  app.get(
    "/api/v1/label",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.getLabelsBoard
  );

  app.put(
    "/api/v1/label/:labelId",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.updateLabel
  );

  app.delete(
    "/api/v1/label/:labelId",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.deleteLabel
  );
};

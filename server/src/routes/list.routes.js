const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/list.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/list/create", [authJwt.verifyToken], controller.createList);
};

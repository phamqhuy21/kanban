const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/board.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/board/create",
    [authJwt.verifyToken],
    controller.createBoard
  );

  app.put(
    "/api/v1/board/:id",
    [verifyUser.checkUserExisted, verifyUser.checkUserIsMemberBoard],
    controller.updateBoard
  );

  //   app.put(
  //     "/api/v1/board/:id",
  //     [verifyUser.verifyToken],
  //     controller.updatePositionList
  //   );

  app.get(
    "/api/v1/board/:id",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.getDetailBoard
  );

  app.get("/api/v1/boards", [authJwt.verifyToken], controller.getBoards);
};

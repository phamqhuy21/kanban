const { authJwt } = require("../middlewares");
const controller = require("../controllers/comment.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/comment",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.createComment
  );

  app.put(
    "/api/v1/comment/:commentId",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.updateComment
  );

  app.delete(
    "/api/v1/comment/:commentId",
    [authJwt.verifyToken, authJwt.isMemberBoard],
    controller.deleteComment
  );
};

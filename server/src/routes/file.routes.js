const { authJwt } = require("../middlewares");
const controller = require("../controllers/file.controller");
let express = require("express");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/file", express.static("upload"));

  app.post(
    "/api/v1/uploadFile",
    [authJwt.verifyToken, authJwt.isMemberBoard, upload.single("upload")],
    controller.uploadFile
  );

  app.post(
    "/api/v1/uploadImage",
    [authJwt.verifyToken, authJwt.isMemberBoard, upload.single("upload")],
    controller.uploadImage
  );
};

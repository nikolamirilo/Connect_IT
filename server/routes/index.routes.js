const userRoutes = require("./user.routes.js");
const express = require("express");

const indexRoutes = express.Router();

indexRoutes.get("/", function (req, res) {
  res.send({
    message:
      "Connect IT Backend. For more info about available routes go to /swagger",
  });
});
indexRoutes.get("/test", function (req, res) {
  res.send({
    message: "Route used for testing",
  });
});

const allRoutes = [
  indexRoutes,
  userRoutes,
];

module.exports = allRoutes;
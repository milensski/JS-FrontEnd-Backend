const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("../middlewares/authMiddleware");

function setupExpress(app) {
  const hbs = handlebars.create({ extname: "hbs" });

  hbs.handlebars.registerHelper("eq", function (a, b) {
    if (a === b) {
      return true;
    } else {
      return false;
    }
  });

  app.engine("hbs", hbs.engine);

  app.set("view engine", "hbs");
  app.use(express.static("public"));

  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(authMiddleware);
}

module.exports = setupExpress;

const jwt = require("../lib/jsonwebtoken");
const config = require("../config/config");

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];
  try {
    if (token) {
      const decoded = await jwt.verify(token, config.development.SECRET);
      req.user = decoded;
      res.locals.isAuthorized = true;
      res.locals.user = decoded;
    }
  } catch (error) {
    res.clearCookie("auth");
    return res.redirect("/login");
  }

  next();
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  next();
};

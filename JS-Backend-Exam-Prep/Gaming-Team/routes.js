const router = require("express").Router();
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const gameController = require("./controllers/gameController");

router.use(authController);
router.use(homeController);
router.use("/", gameController);

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;

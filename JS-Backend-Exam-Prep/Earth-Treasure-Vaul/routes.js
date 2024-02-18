const router = require("express").Router();
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const stoneController = require("./controllers/stoneController");

router.use(authController);
router.use(homeController);
router.use(stoneController);

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;

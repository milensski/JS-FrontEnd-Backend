const router = require("express").Router();
const authController = require('./controllers/authController')
const homeController = require("./controllers/homeController");
const offerController = require("./controllers/offerController");
const { isAuth } = require("./middlewares/authMiddleware");

router.use(authController);
router.use(homeController);
router.use('/', isAuth, offerController)

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;

const router = require("express").Router();
const authController = require('./controllers/authController')
const homeController = require("./controllers/homeController");
const offerController = require("./controllers/offerController");

router.use(authController);
router.use(homeController);
router.use('/', offerController)

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;

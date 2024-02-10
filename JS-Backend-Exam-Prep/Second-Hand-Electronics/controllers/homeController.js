const router = require("express").Router();
const {isAuth} = require('../middlewares/authMiddleware')

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/search", isAuth, (req, res) => {
    res.render('search')
});

module.exports = router;

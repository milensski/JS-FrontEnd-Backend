const router = require("express").Router();
const {isAuth} = require('../middlewares/authMiddleware')
const offerService = require('../services/offerService')


router.get("/", (req, res) => {
  res.render("home");
});

router.get("/catalog", async (req, res) => {
  const offers = await offerService.getAll().lean();

  res.render("catalog", { offers });
});

router.get("/search", isAuth, (req, res) => {
    res.render('search')
});



module.exports = router;

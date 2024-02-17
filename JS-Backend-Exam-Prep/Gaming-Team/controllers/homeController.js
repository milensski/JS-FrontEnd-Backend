const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const gameService = require("../services/gameService");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/catalog", async (req, res) => {
  const games = await gameService.getAll().lean();

  res.render("catalog", { games });
});

router.get("/search", isAuth, async (req, res) => {
  try {
    const games = await gameService.getAll().lean();
    res.render("search", { games });
  } catch (e) {
    res.redirect("/catalog");
  }
});

router.post("/search", isAuth, async (req, res) => {
  try {
    const searchData = req.body;
    let games = [];
    if (!searchData.name && !searchData.platform) {
      games = await gameService.getAll().lean();
    } else {
      games = await gameService.search(req.body).lean();
    }
    res.render("search", { games });
  } catch (e) {
    res.redired("/catalog");
  }
});

module.exports = router;

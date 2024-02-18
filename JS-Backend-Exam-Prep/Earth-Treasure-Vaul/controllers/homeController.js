const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const stoneService = require("../services/stoneService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/", async (req, res) => {
  try {
    const stones = await stoneService.getLast(3).lean();

    res.render("home", { stones });
  } catch (e) {
    res.render("home", { error: getErrorMessage(e) });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const stones = await stoneService.getAll().lean();

    res.render("dashboard", { stones });
  } catch (e) {
    res.render("dashboard", { error: getErrorMessage(e) });
  }
});

router.get("/search", async (req, res) => {
  try {
    const stones = await stoneService.getAll().lean();
    res.render("search", { stones });
  } catch (e) {
    res.redirect("/");
  }
});

router.post("/search", async (req, res) => {
  try {
    const searchData = req.body;
    stones = await stoneService.search(searchData.name).lean();
    res.render("search", { stones });
  } catch (e) {
    res.render("search", { error: getErrorMessage(e) });
  }
});

module.exports = router;

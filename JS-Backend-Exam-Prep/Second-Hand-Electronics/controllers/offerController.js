const router = require("express").Router();
const offerService = require("../services/offerService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const formData = req.body;
  user = req.user
  try {
    await offerService.create(formData, user._id);
    res.redirect("/catalog");
  } catch (e) {
    res.render("create", {error:getErrorMessage(e)});
  }
});

module.exports = router;

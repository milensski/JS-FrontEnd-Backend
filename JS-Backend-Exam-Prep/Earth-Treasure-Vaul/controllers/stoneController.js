const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const stoneService = require("../services/stoneService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
  res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  const formData = req.body;
  formData.owner = req.user._id;

  try {
    await stoneService.create(formData);
    res.redirect("/dashboard");
  } catch (e) {
    res.render("create", { error: getErrorMessage(e), ...formData });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const stone = await stoneService.getOne(req.params.id).lean();

    const isOwner = req.user?.email === stone.owner.email;

    const likes = [];
    stone.likedList.map((user) => user.email).map((user) => likes.push(user));

    const isLiked = likes.includes(req.user?.email);

    res.render("details", { ...stone, isOwner, isLiked });
  } catch (e) {
    res.redirect("/dashboard");
  }
});

router.get("/like/:id", isAuth, async (req, res) => {
  try {
    await stoneService.like(req.params.id, req.user._id);

    res.redirect(`/details/${req.params.id}`);
  } catch (e) {
    res.redirect(`/404`);
  }
});

router.get("/delete/:id", isOwner, async (req, res) => {
  try {
    await stoneService.delete(req.params.id);
    res.redirect("/dashboard");
  } catch (e) {
    res.redirect("/404");
  }
});

router.get("/edit/:id", isOwner, async (req, res) => {
  try {
    const stone = await stoneService.getOne(req.params.id).lean();

    res.render("edit", { ...stone });
  } catch (e) {
    res.render("/404", { error: getErrorMessage(e) });
  }
});

router.post("/edit/:id", isOwner, async (req, res) => {
  const formData = req.body;
  try {
    await stoneService.edit(req.params.id, formData);

    res.redirect(`/details/${req.params.id}`);
  } catch (e) {
    res.render(`edit`, {
      error: getErrorMessage(e),
      ...formData,
    });
  }
});

async function isOwner(req, res, next) {
  const stone = await stoneService.getOne(req.params.id).lean();

  if (!stone) {
    return res.redirect("/404");
  }

  if (stone && stone.owner._id != req.user?._id) {
    return res.redirect(`/details/${req.params.id}`);
  }

  req.stone = stone;

  next();
}

module.exports = router;

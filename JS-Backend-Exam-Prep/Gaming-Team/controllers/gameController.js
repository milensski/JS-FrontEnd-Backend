const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const gameService = require("../services/gameService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
  res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  const formData = req.body;
  formData.owner = req.user._id;

  try {
    await gameService.create(formData);
    res.redirect("/catalog");
  } catch (e) {
    res.render("create", { error: getErrorMessage(e) });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const game = await gameService.getOne(req.params.id).lean();

    const isOwner = req.user?.username === game.owner.username;

    const buyerList = [];
    game.boughtBy
      .map((user) => user.username)
      .map((user) => buyerList.push(user));

    const isBuyer = buyerList.includes(req.user?.username);

    res.render("details", { ...game, isOwner, isBuyer });
  } catch (e) {
    res.redirect("/catalog");
  }
});

router.get("/buy/:id", isAuth, async (req, res) => {
  try {
    await gameService.buy(req.params.id, req.user._id);

    res.redirect(`/details/${req.params.id}`);
  } catch (e) {
    res.render(`catalog`, { error: getErrorMessage(e),  });
  }
});

router.get("/delete/:id", isOwner, async (req, res) => {
  await gameService.delete(req.params.id);
  res.redirect("/catalog");
});

router.get("/edit/:id", isOwner, async (req, res) => {
  try {
    const game = await gameService.getOne(req.params.id).lean();

    res.render("edit", { ...game });
  } catch (e) {
    res.redirect("/catalog");
  }
});

router.post("/edit/:id", isOwner, async (req, res) => {
  const formData = req.body;
    const game = await gameService.getOne(req.params.id).lean();
  try {
    await gameService.edit(req.params.id, formData);

    res.redirect(`/details/${req.params.id}`);
  } catch (e) {
    res.render(`edit`, {
      error: getErrorMessage(e), ...game
    });
  }
});

async function isOwner(req, res, next) {
  const game = await gameService.getOne(req.params.id).lean();

  if (!game) {
    return res.redirect("/404");
  }

  if (game && game.owner._id != req.user?._id) {
    return res.redirect(`/details/${req.params.id}`);
  }

  req.game = game;

  next();
}

module.exports = router;

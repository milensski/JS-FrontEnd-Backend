const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const offerService = require("../services/offerService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
  res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  const formData = req.body;
  formData.owner = req.user._id;

  try {
    await offerService.create(formData);
    res.redirect("/catalog");
  } catch (e) {
    res.render("create", { error: getErrorMessage(e) });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const offer = await offerService.getOne(req.params.id).lean();

    const isOwner = req.user?.username === offer.owner.username;

    const buyerList = [];
    offer.buyingList
      .map((user) => user.username)
      .map((user) => buyerList.push(user));

    const isBuyer = buyerList.includes(req.user?.username);

    res.render("details", { ...offer, isOwner, isBuyer });
  } catch (e) {
    res.redirect("/catalog", { error: getErrorMessage(e) });
  }
});

router.get("/buy/:id", isAuth, async (req, res) => {
  try {
    await offerService.buy(req.params.id, req.user._id);

    res.redirect(`/details/${req.params.id}`);
  } catch (e) {
    res.render(`details/${req.params.id}`, { error: getErrorMessage(e) });
  }
});

router.get("/delete/:id", isOwner, async (req, res) => {
  await offerService.delete(req.params.id);
  res.redirect("/catalog");
});

router.get("/edit/:id", isOwner, async (req, res) => {
  const offer = await offerService.getOne(req.params.id).lean();
  res.render("edit", { ...offer });
});

router.post("/edit/:id", isOwner, async (req, res) => {
  const formData = req.body;
  try {
    await offerService.edit(req.params.id, formData);

    res.redirect(`/details/${req.params.id}`);
  } catch (e) {
    res.render(`edit/${req.params.id}`, {
      error: getErrorMessage(e),
      ...formData,
    });
  }
});

async function isOwner(req,res,next) {
  const offer = await offerService.getOne(req.params.id).lean();
  if (offer && offer.owner?._id != req.user?._id) {
    return res.redirect(`/details/${req.params.id}`)
  }

  req.offer = offer;

  next();
}

module.exports = router;

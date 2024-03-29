const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  let userData = req.body;

  try {
    if (userData.password !== userData.rePassword) {
      throw new Error("Password dont match!");
    }

    const token = await authService.create(userData);

   //auto Login
    res.cookie('auth', token)

    res.redirect("/");
    
  } catch (error) {
    res.render("register", { error: getErrorMessage(error), ...userData });
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    res.render("login", { error: getErrorMessage(error) });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});



module.exports = router;

const express = require("express");
const router = express.Router();
const data = require("../data");
const login = data.login;

router.get("/", async (req, res) => {
  res.render("loginPage/loginPage", {});
});

module.exports = router;
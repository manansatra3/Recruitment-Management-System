const express = require("express");
const router = express.Router();
const data = require("../data");
const  signup = data.signup;

router.get("/", async (req, res) => {
  res.render("loginPage/signup", {});
});

module.exports = router;
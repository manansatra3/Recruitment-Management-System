const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.usersData;

router.get("/", async (req, res) => {
  res.render("loginPage/loginPage", {});
});


module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");
//const  signup = data.signup;

router.post("/", async (req, res) => {
    console.log(req);
  res.status(200).json({message:"succeed"})

});

module.exports = router;
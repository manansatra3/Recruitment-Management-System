const express = require("express");
const router = express.Router();
const data = require("../data");

router.get('/submitApplication', (req, res)=> {
    res.render('applicationPages/submitApplication.handlebars')
});

router.get("/profile", (req, res)=>{
    res.render('profileSubmission.handlebars');
});

module.exports = router;
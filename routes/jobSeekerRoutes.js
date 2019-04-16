const express = require("express");
const router = express.Router();
const data = require("../data");

router.get('/submitApplication', (req, res)=> {
    res.render('applicationPages/submitApplication.handlebars')
});
module.exports = router;
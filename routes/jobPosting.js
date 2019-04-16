const express = require("express");
const router = express.Router();

router.get("/jobPosting",(req,res)=>{
    res.render('jobPosting.handlebars');
});

module.exports = router;
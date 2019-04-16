const express = require("express");
const router = express.Router();

router.get("/jobPosting",(req,res)=>{
    res.render('postNewJob.handlebars');
});

module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");

router.get('/postOrView', async (req, res)=>{
    res.render('recruiterPostOrViewPage.handlebars');
});

router.get("/postNewJob",(req,res)=>{
    res.render('postNewJob.handlebars');
});

router.get("/viewApplications", (req, res)=>{
    res.send({"message":"christina implement the view applications page here on this route"})
});

router.get("/viewApplications/:jobId/:userId", async (req, res)=>{
    res.render('viewIndividualApplicant.handlebars')
});

module.exports = router;
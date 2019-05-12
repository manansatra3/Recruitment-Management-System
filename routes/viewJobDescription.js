const express = require("express");
const router = express.Router();
const data = require("../data");
const  jobDescription = data.jobDescription;

isAuthJobSeeker = (req, res, next) => {
    // console.log(req.session.authority)
    if (req.session.authority == undefined || req.session.authority == false) {
        res.render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
    }
    else if (req.session.userType === 'Recruiter') {
        res.render('errorPage', { e: { statusCode: "403", error: "Forbidden", redirect: "/" } })
    }
    else {
        next();
    }
};

router.use(isAuthJobSeeker)




router.post("/:jobId?", async (req, res) => {
    //console.log(req.query.jobId);
    //const parsedId = ObjectId.createFromHexString(req.query.jobId);
    //console.log("hi")
    //console.log(typeof req.query.jobId)
    const result = await jobDescription.getJobById(req.query.jobId)
    res.status(200).render("applicantViewJobDescription",{
        result : result,
        logoutOption: true
    })
    //res.status(200).json({message: "hello"})
  });

  
  module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");
const application = data.application;

isAuthJobSeeker = (req, res, next) => {
    // console.log(req.session.authority)
    if (req.session.authority == undefined || req.session.authority == false) {
        res.status(401).render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
    }
    else if (req.session.userType === 'Recruiter') {
        res.status(403).render('errorPage', { e: { statusCode: "403", error: "Forbidden", redirect: "/" } })
    }
    else {
        next();
    }
};

router.use(isAuthJobSeeker)




router.post("/:applicationID?", async (req, res) => {
    //console.log(req.query.jobId);
    //const parsedId = ObjectId.createFromHexString(req.query.jobId);
    //console.log("hi")
    //console.log(typeof req.query.jobId)
    //console.log(req.query)
    const result = await application.getApplicationByID(req.query.applicationID)
    //console.log(result);
    var jobNameNow = result.jobName;
    var applicationStatusNow = result.applicationStatus;
    var applicationTimeNow = result.applicationTime;
    res.status(200).render("applicantViewApplication",{
        jobName : jobNameNow,
        applicationStatus:applicationStatusNow,
        applicationTime:applicationTimeNow,
        logoutOption: true
    })
    //res.status(200).json({message: "hello"})
  });

  
  module.exports = router;
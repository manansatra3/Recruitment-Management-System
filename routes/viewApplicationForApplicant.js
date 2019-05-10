const express = require("express");
const router = express.Router();
const data = require("../data");
const application = data.application;

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
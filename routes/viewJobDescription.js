const express = require("express");
const router = express.Router();
const data = require("../data");
const  jobDescription = data.jobDescription;

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
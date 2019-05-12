const express = require("express");
const router = express.Router();
const data = require("../data");
const  jobDescription = data.jobDescription;

isAuthRec = (req, res, next) => {
  // console.log(req.session.authority)
  if (req.session.authority == undefined || req.session.authority == false) {
      res.render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
  }
  else if (req.session.userType === 'Applicant') {
      res.render('errorPage', { e: { statusCode: "403", error: "Forbidden", redirect: "/" } })
  }
  else {
      next();
  }
};

router.use(isAuthRec)

router.post("/", async (req, res) => {
// session part here
const usersData = req.body;
  try{
    if(req.body === undefined){
      res.status(400).json({message : "There isn't body in the request"})
    }

    //jobTitle, jobType, jobLocation, experienceLevel, jobResponsibilities
    // if(typeof(req.body.userID) !== "string"){
    //   res.status(400).json({message : "User name should be string"})
    // }
    if(typeof(req.body.jobTitle) !== "string"){
      res.status(400).json({message : "Job title should be string"})
    }
    if(typeof(req.body.jobType) !== "string"){
      res.status(400).json({message : "Job Type should be string"})
    }
    if(typeof(req.body.jobLocation) !== "string"){
        res.status(400).json({message : "Job Location should be string"})
      }

      if(typeof(req.body.experienceLevel) !== "string"){
        res.status(400).json({message : "Experience level should be string"})
      }

      if(typeof(req.body.jobDescription) !== "string"){
        res.status(400).json({message : "Job Description should be string"})
      }
      // console.log(req.body.jobTitle)
    var createdUser = await jobDescription.createjobDescription(req.body.jobTitle,req.body.jobType, req.body.jobLocation, req.body.experienceLevel, req.body.jobDescription);
  
    res.redirect('/employer/postOrView');
  }
  catch(error)
  {
  res.status(404).json({message:error})
  }



});

module.exports = router;
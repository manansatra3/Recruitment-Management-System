const express = require("express");
const router = express.Router();
const data = require("../data");
const jobDescription = data.jobDescription

router.get("/", async (req, res) => {
    //res.status(200).json({message:"go home"})
    if(req.session.authority == true)
    {
        if(req.session.userType == "Applicant")
        {
            const result = await jobDescription.getAllJobs();
            console.log(result)
            console.log(req.session)
            res.status(200).render("./applicantViewJobPostings",
            {
              result : result
            })
            return
        }
    }
    // const usersData = req.body;
    // tryy
    
    //   if(req.body === undefined){
    //     res.status(400).json({message : "There isn't body in the request"})
    //   }
    //   if(typeof(req.body.userName) !== "string"){
    //     res.status(400).json({message : "User name should be string"})
    //   }
    //   if(typeof(req.body.email) !== "string"){
    //     res.status(400).json({message : "Email should be string"})
    //   }
    //   if(typeof(req.body.password) !== "string"){
    //     res.status(400).json({message : "Password should be string"})
    //   }
    //   //console.log(signupData);
    //   const createdUser = await signupCurrent.signup("Applicant",req.body.userName,req.body.email,req.body.password)
    //   res.status(200).render("loginPage/aftersignup", {});
    //   //res.status(200).json({message:"go home"})
    // }
    // catch(error)
    // {
    // res.status(404).json({message:error})
    // }
    res.json({error: "not logged in"})
  });
  
  module.exports = router;
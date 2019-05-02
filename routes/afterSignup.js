const express = require("express");
const router = express.Router();
const data = require("../data");
const  usersDataHandler = data.usersData;
//const signupCurrent = signupCurrent.signup;


router.post("/", async (req, res) => {

  const usersData = req.body;
  try{
    if(req.body === undefined){
      res.status(400).json({message : "There isn't body in the request"})
    }
    if(typeof(req.body.userName) !== "string"){
      res.status(400).json({message : "User name should be string"})
    }
    if(typeof(req.body.email) !== "string"){
      res.status(400).json({message : "Email should be string"})
    }
    if(typeof(req.body.password) !== "string"){
      res.status(400).json({message : "Password should be string"})
    }
    var createdUser = await usersDataHandler.signup("Applicant",req.body.userName,req.body.email,req.body.password);
  
    res.status(200).render("loginPage/aftersignup", {});
  }
  catch(error)
  {
  res.status(404).json({message:error})
  }

});

module.exports = router;
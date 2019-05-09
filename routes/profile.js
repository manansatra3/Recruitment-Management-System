const express = require("express");
const router = express.Router();
const data = require("../data");
const info = data.applicantData;

router.get("/", (req, res) => {
    res.render('profileSubmission.handlebars');
    
});

router.post("/", async (req, res) => {
    let applicantInfo = req.body;
    if(!applicantInfo || !applicantInfo.name || !applicantInfo.email || !applicantInfo.phoneNumber){
      res.sendStatus(400);
      return;
    }
    try {
        const addInfo = await info.applicantapplicantInfo(applicantInfo.firstName, applicantInfo.lastName, applicantInfo.email, applicantInfo.phoneNumber,
             applicantInfo.address, applicantInfo.currentEducation, applicantInfo.previousEducation,
             applicantInfo.currentWork, applicantInfo.previousWork);
        res.json(addInfo);
        res.status(305).render("/viewJobDescription");
    } catch (e) {
      res.sendStatus(500);
      return;
    }
});

module.exports = router;
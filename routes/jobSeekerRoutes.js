const express = require("express");
const router = express.Router();
const data = require("../data");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/submitApplication', (req, res)=> {
    res.render('submitApplication.handlebars');
});

router.post('/submitApplication', upload.array('docs',4), (req, res)=> {
    console.log("in post submitApplication");
    console.log(req.files)
    // var resume = req.body.resume;
    // var coverLetter = req.body.coverLetter;
    // var transcripts = req.body.transcripts;
    // var extraDocuments = req.body.extraDocuments; 
    var extraComments = req.body.extraComments;
    console.log(extraComments);
    res.send(req.file)
    // console.log(resume);
    // data.submitApplication.insertDocumentsToDatabase(resume, coverLetter, transcripts, extraDocuments, extraComments);
});

router.get("/profile", (req, res)=>{
    res.render('profileSubmission.handlebars');
});

module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");
const multer = require('multer');
const upload = multer()

router.get('/submitApplication', (req, res)=> {
    res.render('submitApplication.handlebars');
});

router.post('/submitApplication', upload.single('resume'), (req, res) => {
    console.log("in post submitApplication");
    console.log(req.file) 
    var extraComments = req.body.extraComments;
    console.log(extraComments);
    // res.send(req.file)
    // data.submitApplication.insertDocumentsToDatabase(resume, coverLetter, transcripts, extraDocuments, extraComments);
    data.submitApplication.insertDocumentsToDatabaseWithGridFS(req, res);
});

router.get("/profile", (req, res)=>{
    res.render('profileSubmission.handlebars');
});

module.exports = router;
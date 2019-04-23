const express = require("express");
const router = express.Router();
const data = require("../data");
const multer = require('multer');
const upload = multer()

router.get('/submitApplication', (req, res)=> {
    res.render('submitApplication.handlebars');
});

// ---------single file--------------
// router.post('/submitApplication', upload.single('resume'), (req, res) => {
//     console.log("in post submitApplication");
//     console.log(req.file) 
//     var extraComments = req.body.extraComments;
//     console.log(extraComments);
//     // res.send(req.file)
//     // data.submitApplication.insertDocumentsToDatabase(resume, coverLetter, transcripts, extraDocuments, extraComments);
//     data.submitApplication.insertDocumentsToDatabaseWithGridFS(req, res);
// });

// ---------multiple file--------------
router.post('/submitApplication', upload.array('docs'), async (req, res) => {
    console.log("in post submitApplication");
    // console.log(req.files) 
    var extraComments = req.body.extraComments;
    var metadata = {extraComments: extraComments};
    console.log(extraComments);
    try {
        for(let file of req.files){
            await data.submitApplication.insertDocumentsToDatabaseWithGridFS(file, metadata);
        }
        res.json({msg: 'finished'})
    } catch (e) {
        res.status(500).json({msg: 'error', err: e})
    }
});

router.get("/profile", (req, res)=>{
    res.render('profileSubmission.handlebars');
});

module.exports = router;
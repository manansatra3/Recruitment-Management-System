const express = require("express");
const router = express.Router();
const data = require("../data");
const multer = require('multer');
const path = require('path');
const info = data.applicantData;

// const upload = multer()
const upload = multer({ //multer settings
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
            return callback(new Error('Only doc, docx and pdf are allowed'))
            // router.get('/error', (req, res)=>{
            // res.render('errorPage.handlebars',{e:{statusCode:"badinput",error:"only doc docx pdf allowed"}});
            // });
            // callback(err)
        }
        else {
            callback(null, true)
        }
    }
})

router.get('/submitApplication', (req, res) => {
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

router.post('/submitApplication/:jobId?',async (req,res) => {
    console.log(req.session);
    //console.log(req.session.userId);
    console.log(req.query.jobId);
res.render('submitApplication')
});










// ---------multiple file--------------
// router.post('/submitApplication', async (req, res) => {
//     await upload.array('docs')(req, res, async (err) => {
//         if(err) {
//             // error
//             res.status(400).render('errorPage.handlebars',{e:{statusCode:"400",error:"only doc docx pdf allowed", redirect: "/applicant/submitApplication"}});
//             return
//         }
//         console.log("in post submitApplication");
//         // console.log(req.files) 
//         var extraComments = req.body.extraComments;
//         var metadata = { extraComments: extraComments };
//         console.log(extraComments);
//         try {
//             for (let file of req.files) {
//                 await data.submitApplication.insertDocumentsToDatabaseWithGridFS(file, metadata);
//             }
//             res.json({ msg: 'finished' })
//         } catch (e) {
//             res.status(500).json({ msg: 'error', err: e })
//         }
//     })
// });

// router.get("/profile", (req, res) => {
//     res.render('profileSubmission.handlebars');
// });

// router.post("/", async (req, res) => {
//     const applicantInfo = req.body;
//     console.log(applicantInfo.name)
//     if(!applicantInfo || !applicantInfo.name || !applicantInfo.email || !applicantInfo.phoneNumber){
//       res.sendStatus(400);
//       return;
//     }
//     try {
//         const addInfo = await info.applicantapplicantInfo(applicantInfo.name, applicantInfo.email, applicantInfo.phoneNumber, applicantInfo.education, applicantInfo.work);
//         res.json(addInfo);
//         res.status(305).render("/viewJobDescription");
//     } catch (e) {
//       res.sendStatus(500);
//       return;
//     }
// })
module.exports = router;
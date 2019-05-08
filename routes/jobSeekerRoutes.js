const express = require("express");
const router = express.Router();
const data = require("../data");
const multer = require('multer');
const path = require('path');
const mongoCollections = require("./../data/collection");
const ObjectID = require('mongodb').ObjectID;
// const applicantDocuments = mongoCollections.applicantDocuments;
const jobsAndDocs = mongoCollections.jobsAndDocs;
const upload = multer()
// const upload = multer({ //multer settings
//     fileFilter: function (req, file, callback) {
//         var ext = path.extname(file.originalname);
//         if (ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
//             return callback(new Error('Only doc, docx and pdf are allowed'))
//             // router.get('/error', (req, res)=>{
//             // res.render('errorPage.handlebars',{e:{statusCode:"badinput",error:"only doc docx pdf allowed"}});
//             // });
//             // callback(err)
//         }
//         else {
//             callback(null, true)
//         }
//     }
// })


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

router.get('/submitApplication/:jobId',async (req,res) => {
    // console.log(req.session);
    // console.log(req.session.userId);
    // console.log(req.params.jobId);
res.render('submitApplication', {jobId:req.params.jobId })
});

// ---------multiple file--------------
router.post('/submitApplication/:jobId', upload.array('docs'), async (req, res) => {
    // await upload.array('docs')(req, res, async (err) => {
    //     if(err) {
    //         // error
    //         res.status(400).render('errorPage.handlebars',{e:{statusCode:"400",error:"only doc docx pdf allowed", redirect: "/applicant/submitApplication"}});
    //         return
    //     }
        console.log("in post submitApplication");
        const currentUser = req.session.userID;
        const jobId = req.params.jobId;
        // console.log(req.files.length)
        var extraComments = req.body.extraComments;
        var metadata = { extraComments: extraComments };
        // console.log(extraComments);
        var allDocIds=[]
        try {
            for (var file of req.files) {
                // console.log(`file: ${req.files[i]}`)
                const newDocId = await data.submitApplication.insertDocumentsToDatabaseWithGridFS(file, metadata);
                // console.log(newDocId)
                allDocIds.push(newDocId)
            }
            console.log(`Current user's userId is ${currentUser}`)
            console.log(`Ids of all documents uploaded by userId ${currentUser} for jobId ${jobId} are ${allDocIds}`);
            const jobsAndDocsCollection = await jobsAndDocs();
            console.log("Collection hunting done");
            const exist = await jobsAndDocsCollection.findOne({userId:currentUser})
            console.log(`finding done with result of ${exist}`)
            if (exist!==null) {
                console.log("User already exists in jobsAndDocs")
                await jobsAndDocsCollection.updateOne({_id: exist._id},{ $set: {[req.params.jobId]:allDocIds}});
            }
            else {
                // console.log(`UserId ${userId} does not exists in jobsAndDocs collection of Mongo. So creating a new document!`);
                const toBeInsertedInDb = {
                    userId: currentUser,
                    [req.params.jobId]: allDocIds
                };
                await jobsAndDocsCollection.insertOne(toBeInsertedInDb);
            }
            console.log("Rendering afterSubmitApplication")
            res.render('afterSubmitApplication.handlebars')
        } catch (e) {
            res.status(500).json({ msg: 'error', err: e })
        }
    });

router.get("/profile", (req, res) => {
    res.render('profileSubmission.handlebars');
});

module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");

router.get('/postOrView', async (req, res)=>{
    res.render('recruiterPostOrViewPage.handlebars');
});

router.get("/postNewJob",(req,res)=>{
    res.render('postNewJob.handlebars');
});

router.get("/viewApplications", (req, res)=>{
    res.render('viewApplications.handlebars');
});

router.get("/viewApplications/:jobId/:userId", async (req, res)=>{
    res.render('viewIndividualApplicant.handlebars')
});

router.post("/viewApplications/:jobId/:userId", async(req, res)=>{
    try {
        console.log('gonna start download');
        const userId= req.params.userId;
        const jobId = req.params.jobId;
        console.log(userId);
        console.log(jobId);
        const archiveStream = await data.getApplicantDocuments.foo(userId, jobId)
        // res.send(200).json({msg:"done"});

        // const downloadStream = await data.getApplicantDocuments.getDocuments('sample.txt');
        res.setHeader('Content-Disposition', `attachment; filename="user-${req.params.userId}.zip"`)
        archiveStream.pipe(res)
        archiveStream.finalize()
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.toString()})
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require ('xss');

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

router.get('/postOrView', async (req, res) => {
    res.render('recruiterPostOrViewPage.handlebars', {
        logoutOption: true
    });
});

router.get("/postNewJob", (req, res) => {
    res.render('postNewJob.handlebars', {
        logoutOption: true
    });
});

router.get("/viewApplications", async (req, res) => {
    // try{
    // console.log("before result")
    // const result = await data.application.groupJobIdWithUserCount()

    // //console.log(result)
    // console.log("after result")
    // }
    // catch(error){

    // }
    const jobDescription = await data.jobDescription;
    const jobDescriptionResult = await jobDescription.getAllJobs();
    var countApplicationsArray = []

    for (var i = 0; i < jobDescriptionResult.length; i++) {
        const application = await data.application;
        var applicationResult = await application.getApplicationByJobId(jobDescriptionResult[i]._id);
        var applicationNumber = applicationResult.length;
        var countApplications = {}
        countApplications["Name"] = jobDescriptionResult[i].jobTitle
        countApplications["Count"] = applicationNumber
        countApplications["JobId"] = jobDescriptionResult[i]._id.toString();
        //countApplications[jobDescriptionResult[i].jobTitle] = applicationNumber
        countApplicationsArray.push(countApplications);
        //console.log(jobDescriptionResult[i].jobTitle+" : "+applicationNumber);

    }
    //console.log(countApplicationsArray)
    res.render('viewApplications.handlebars', {
        logoutOption: true,
        countApplicationsArray: countApplicationsArray
    });
});


router.get("/viewApplications/:jobId/:userId", async (req, res) => {
    // console.log(req.params);
    const userId = req.params.userId;
    const jobId = req.params.jobId;
    const applicantInfo = await data.getApplicantDocuments.fetchApplicantInfo(userId, jobId);
    // console.log(`HIII ${applicantInfo}`)
    res.render('viewIndividualApplicant.handlebars',{e: {applicantInfo, jobId, userId}})
});

router.post("/viewApplications/:jobId/:userId", async (req, res) => {
    xss(req.body);
    try {
        // console.log('gonna start download');
        const userId = req.params.userId;
        const jobId = req.params.jobId;
        // console.log(`User id from URL-- ${userId}`);
        // console.log(`Job id from URL-- ${jobId}`);
        const archiveStream = await data.getApplicantDocuments.foo(userId, jobId)
        // res.send(200).json({msg:"done"});

        // const downloadStream = await data.getApplicantDocuments.getDocuments('sample.txt');
        res.setHeader('Content-Disposition', `attachment; filename="user-${userId}.zip"`)
        archiveStream.pipe(res)
        archiveStream.finalize()
        // res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.toString() })
    }
});

router.post("/viewApplications/getApplicantNames:JobId?", async (req, res) => {
    xss(req.body);
    const application = data.application;
    var applicants = [];
    //console.log(req.query)
    //console.log(req)
    const result = await application.getFullName(req.query.JobId);
    for (let i = 0; i < result.length; i++) {
        let currentUserName = result[i].fullName;
        var currentName = {}
        currentName.name = currentUserName
        currentName.userId = result[i].userId;
        currentName.jobId = result[i].jobId;
        applicants.push(currentName);
    }
    res.status(200).render("applicantDetailsForRecruiter",
        {
            applicantsArray: applicants
        })

});

router.get("/applicationStatus/:jobId/:userId", async(req, res) => {
    const userId = req.params.userId;
    const jobId = req.params.jobId;
    res.render("changeStatus", {userId, jobId});
})
router.post("/applicationStatus/:jobId/:userId", async (req, res) => {
    xss(req.body);
    const application = data.application;
    let status = await application.changeStatus(req.body.radioButton, req.params.userId);
    res.redirect(`/employer/viewApplications/${req.params.jobId}/${req.params.userId}`)
})

module.exports = router;
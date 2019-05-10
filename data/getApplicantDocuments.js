const mongoCollections = require("./collection");
const applicantDocuments = mongoCollections.applicantDocuments;
const users = mongoCollections.users;
const jobsAndDocs = mongoCollections.jobsAndDocs;
const connection = require('./connection');
const ObjectID = require('mongodb').ObjectID;
const { GridFSBucket: Grid } = require('mongodb')
const binaryMongo = require('mongodb').Binary;
const fs = require('fs');
const crypto = require('crypto')
const multer = require('multer')
const archiver = require('archiver');

async function foo(userId, jobId) {
    console.log(`In foo the userId is ${userId}`)
    console.log(`In foo the jobId is ${jobId}`)
    // const usersCollection = await users();
    
    const jobsAndDocsCollection = await jobsAndDocs();
    const jobsAndDocsObject = await jobsAndDocsCollection.findOne({userId});
    console.log(jobsAndDocsObject[jobId]);
    const docArray = jobsAndDocsObject[jobId];
    return getDocuments(docArray);
    
    // const db = await connection();
    // const grid = new Grid(db, { bucketName: 'applicantDocuments' });
      
    //   grid.openDownloadStreamByName('GENERAL MananSatra_Resume.docx').
    //     pipe(fs.createWriteStream('./output.docx')).
    //     on('error', function(error) {
    //       assert.ifError(error);
    //     }).
    //     on('finish', function() {
    //       console.log('done!');
    //       process.exit(0);
    //     });
    
    // const theUser = await usersCollection.findOne({ _id: ObjectID(userId) });
    // // console.log(theUser);
    // // console.log(theUser.jobAndDocs[jobId])
    // const howManyDocs = theUser.jobAndDocs[jobId].length;
    // console.log(howManyDocs);
    // const docArray = theUser.jobAndDocs[jobId]
    // // for (let eachDoc of docArray) {
    // //     // console.log(eachDoc)
    // return getDocuments(docArray);
}


function getDocuments(docArray) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Inside getDocuments')
            const db = await connection();
            const grid = new Grid(db, { bucketName: 'applicantDocuments' });
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });
            archive.on('error', (err) => {
                throw err;
            });
            for (eachDoc of docArray) {
                const appDocCollection = await applicantDocuments();
                const fileInfo = await appDocCollection.findOne({_id: ObjectID(eachDoc)})
                const downloadStream = grid.openDownloadStream(ObjectID(eachDoc));
                downloadStream.on('error', () => {
                    downloadStream.end()
                    throw { msg: "GridFS Download Error" }
                })
                archive.append(downloadStream, {name: fileInfo.filename})
            }

            resolve(archive)

            // downloadStream.write(file.buffer, file.encoding, () => {
            //     uploadStream.end();
            // });
            // uploadStream.on('error', () => reject("Unable to add file to GridFS"))
            // uploadStream.on('finish', () => resolve(true))
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = { getDocuments, foo };
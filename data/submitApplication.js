const mongoCollections = require("./collection");
const applicantDocuments = mongoCollections.applicantDocuments;
// const jobsAndDocs = mongoCollections.jobsAndDocs;
const connection = require('./connection');
const ObjectID = require('mongodb').ObjectID;
const { GridFSBucket : Grid } = require('mongodb')
const binaryMongo = require('mongodb').Binary;
const fs = require('fs');
const crypto = require('crypto')
const multer = require('multer')
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');

//---------------- Without GridFS--------------
// async function insertDocumentsToDatabase(resume, coverLetter, transcripts, extraDocuments, extraComments) {
//     console.log("Inside insertDocumentsToDatabase without gridfs")  
//     var insert_data = {};
//     insert_data.file_data = binaryMongo(resume);
//     const applicantDocumentsCollection = await applicantDocuments();
//     const newDocumentsInserted = await applicantDocumentsCollection.insertOne(insert_data);
//     console.log("Inserted!");
//     console.log("lets retrive it")
//     const docs = await applicantDocumentsCollection.findOne({});
//     console.log(docs);
//     fs.writeFile('file_name.txt', docs.file_data.buffer, function (err) {
//         if (err) throw err;
//         console.log('Sucessfully saved!');
//     });
// }


// ----------------- with GridFS ----------------
async function insertDocumentsToDatabaseWithGridFS(file, metadata) {
    return new Promise(async (resolve, reject) => {
        try {
            // Connect to the db
            const db = await connection();
            const grid = new Grid(db, { bucketName: 'applicantDocuments'});
            const uploadStream = grid.openUploadStream(file.originalname, {contentType: file.mimetype, metadata })
            uploadStream.write(file.buffer, file.encoding, () => {
                uploadStream.end();
            });
            uploadStream.on('error', () => reject("Unable to add file to GridFS"))
            uploadStream.on('finish', async (data) =>{
                // console.log(data._id);
                // console.log("uploaded")
                // const applicantDocumentsCollection = await applicantDocuments();
                // var newDocId = await applicantDocumentsCollection.findOne();
                // await db.collection('applicantDocuments.files', async function(err, collection) {
                //     await collection
                //       .find()
                //       .sort({$natural: -1})
                //       .limit(1)
                //       .next()
                //       .then(
                //         function(doc) {
                //             console.log(doc);
                //             console.log(typeof doc._id);
                //             const newDocId = doc._id;
                //         },
                //         function(err) {
                //           console.log('Error:', err);
                //         }
                //       );
                //   });
                //   const jobsAndDocsCollection = await jobsAndDocs();
                  
                // console.log(newDocId._id);
                
                // resolve(true)
                // console.log(newDocId)
                resolve (data._id);
            })
            
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = { insertDocumentsToDatabaseWithGridFS };

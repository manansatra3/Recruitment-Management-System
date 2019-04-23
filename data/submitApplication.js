const mongoCollections = require("./collection");
const applicantDocuments = mongoCollections.applicantDocuments;
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
function insertDocumentsToDatabaseWithGridFS(file, metadata) {
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
            uploadStream.on('finish', () => resolve(true))
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = { insertDocumentsToDatabaseWithGridFS };

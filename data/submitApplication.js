const mongoCollections = require("./collection");
const applicantDocuments = mongoCollections.applicantDocuments;
const connection = require('./connection');
const ObjectID = require('mongodb').ObjectID;
const { GridFSBucket : Grid } = require('mongodb')
const binaryMongo = require('mongodb').Binary;
const fs = require('fs');
// var upload = multer({ dest: 'uploads/' })

// for gridFS
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');

//---------------- Without GridFS--------------
async function insertDocumentsToDatabase(resume, coverLetter, transcripts, extraDocuments, extraComments) {
    console.log("Inside insertDocumentsToDatabase without gridfs")  
    var insert_data = {};
    insert_data.file_data = binaryMongo(resume);
    const applicantDocumentsCollection = await applicantDocuments();
    const newDocumentsInserted = await applicantDocumentsCollection.insertOne(insert_data);
    console.log("Inserted!");
    console.log("lets retrive it")
    const docs = await applicantDocumentsCollection.findOne({});
    console.log(docs);
    fs.writeFile('file_name.txt', docs.file_data.buffer, function (err) {
        if (err) throw err;
        console.log('Sucessfully saved!');
    });
}


    // ----------------- with GridFS ----------------
    async function insertDocumentsToDatabaseWithGridFS(req, res) {
        // let gfs;
        

        // Connect to the db
        const db = await connection();
        const grid = new Grid(db);
        const file = req.file;
        // grid.put(buffer, { metadata: { category: 'text' }, content_type: 'text' }, function (err, fileInfo) {
        //     if (!err) {
        //         console.log("Finished writing file to Mongo");
        //     }
        // });

        const uploadStream = grid.openUploadStream(file.originalname, {contentType: file.mimetype, metadata:{}})
        uploadStream.write(req.file.buffer, req.file.encoding, () => {
            uploadStream.end();
        });

        uploadStream.on('error', () => res.status(500).json({msg: 'error'}))
        uploadStream.on('finish', () => res.json({msg: 'finished'}))
    
}

module.exports = { insertDocumentsToDatabase,insertDocumentsToDatabaseWithGridFS };

const mongoCollections = require("./collection");
const applicantDocuments = mongoCollections.applicantDocuments;
const ObjectID = require('mongodb').ObjectID;
const binaryMongo = require('mongodb').Binary;
const fs = require('fs');

async function insertDocumentsToDatabase(resume, coverLetter, transcripts, extraDocuments, extraComments) {
    console.log("Inside insertDocumentsToDatabase")
    var insert_data = {};
    insert_data.file_data = binaryMongo(resume);
    const applicantDocumentsCollection = await applicantDocuments();
    const newDocumentsInserted = await applicantDocumentsCollection.insertOne(insert_data);
    console.log("Inserted!");
    console.log("lets retrive it")
    const docs = await applicantDocumentsCollection.findOne({});
    console.log(docs);
    fs.writeFile('file_name.txt', docs.file_data.buffer, function(err){
        if (err) throw err;
        console.log('Sucessfully saved!');
    });

}

module.exports = {insertDocumentsToDatabase};

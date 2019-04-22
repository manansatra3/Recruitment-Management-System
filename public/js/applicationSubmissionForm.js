const mongoCollections = require("./collections");
const applicantDocuments = mongoCollections.applicantDocuments;
const ObjectID = require('mongodb').ObjectID;
const binaryMongo = require('mongodb').Binary;
const fs = require('fs');

async function checkFormValidation() {
    console.log ('here');
    // var firstName = document.getElementsByName('firstName')[0].nodeValue;
    // var lastName = document.getElementsByName('lastName')[0].nodeValue;
    // var email = document.getElementsByName('email')[0].nodeValue;
    // var phoneNumber = document.getElementsByName('phoneNumber')[0].nodeValue;
    // var street = document.getElementsByName('street')[0].nodeValue;
    // var city = document.getElementsByName('city')[0].nodeValue;
    // var zipCode = document.getElementsByName('zipCode')[0].nodeValue;
    // var state = document.getElementById('state').value;
    // var currentUniversity = document.getElementsByName('currentUniversity')[0].nodeValue;
    // var gpa = document.getElementById('gpa');
    // var degree = document.getElementsByName('degree')[0].nodeValue;
    // var major = document.getElementsByName('major')[0].nodeValue;
    // var graduation = document.getElementById('graduation');
    // console.log(graduation.value);
    // if (firstName==null) {
    //     alert('Enter First Name');
    //     return;
    // }
    // if (lastName==null) {
    //     alert('Enter Last Name');
    //     return;
    // }
    var resume = document.getElementById('resume');
    var coverLetter = document.getElementById('coverLetter');
    var transcripts = document.getElementById('transcripts');
    var extraDocuments = document.getElementById('extraDocuments');
    var extraComments = document.getElementById('extraComments');
    var data = fs.readFileSync(resume);
    var insert_data = {};
    insert_data.file_data= binaryMongo(data);
    await applicantDocuments.insert(insert_data);
    console.log("Inserted!");
}
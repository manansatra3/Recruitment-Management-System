const usersData = require("./users");
//const applicantData = require("./applicantInformation");
const submitApplication = require("./submitApplication");
const getApplicantDocuments = require('./getApplicantDocuments');
//const employerData = require('./employerInformation');
const jobDescription = require('./jobDescription');
const application = require('./application')


module.exports = {
  usersData,
  //applicantData,
  //employerData,
  submitApplication,
  getApplicantDocuments,
  jobDescription,
  application
};

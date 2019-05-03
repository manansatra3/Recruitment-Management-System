const usersData = require("./users");
const applicantData = require("./applicantInformation");
const submitApplication = require("./submitApplication");
const getApplicantDocuments = require('./getApplicantDocuments');
const jobPost = require('./jobPost');
const employerData = require('./employerInformation');


module.exports = {
  usersData,
  applicantData,
  employerData,
  jobPost,
  submitApplication,
  getApplicantDocuments
};

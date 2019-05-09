const dbConnection = require("../data/connection");
const data = require("../data/");
const users = data.usersData;
const jobDescription = data.jobDescription;

//before executing please run the command "node tasks/seed.js once"
async function main() {
  const db = await dbConnection();
  //await db.dropDatabase();

  //recruiters
  const recruiter1 = await users.signup("Recruiter", "christina123","christina@gmail.com", "Ball1714!");
  const recruiter2 = await users.signup("Recruiter", "manan123","manan@gmail.com ", "manan@123");
  const recruiter3 = await users.signup("Recruiter", "mohit123","mohit@gmail.com", "mohit@123");
  const recruiter4 = await users.signup("Recruiter", "peng123","peng@gmail.com", "peng@123");
  const recruiter5 = await users.signup("Recruiter", "katya123","katya@gmail.com", "katya@123");

  //applicants
  const applicant1 = await users.signup("Applicant", "john123","john@gmail.com", "john@123");
  const applicant2 = await users.signup("Applicant", "cynthia123","cynthia@gmail.com", "cynthia@123");
  const applicant3 = await users.signup("Applicant", "sam123","sam@gmail.com", "sam@123");
  const applicant4 = await users.signup("Applicant", "mike123","mike@gmail.com", "mike@123");
  const applicant5 = await users.signup("Applicant", "melani123","melani@gmail.com", "melani@123");
  const applicant6 = await users.signup("Applicant", "christopher123","christopher@gmail.com", "christopher@123");
  const applicant7 = await users.signup("Applicant", "david123","david@gmail.com", "david@123");
  const applicant8 = await users.signup("Applicant", "henry123","henry@gmail.com", "henry@123");
  const applicant9 = await users.signup("Applicant", "bob123","bob@gmail.com", "bob@123");
  const applicant10 = await users.signup("Applicant", "kyle123","kyle@gmail.com", "kyle@123");


/*
  jobTitle : jobTitle,
            jobType: jobType,
            jobLocation: jobLocation,
            experienceLevel : experienceLevel,
            jobResponsibilities : jobResponsibilities
*/
  //List of available job postings
  const jobDescription1 = await jobDescription.createjobDescription("Software Engineer", "Full-time", "New York, NY", "Entry Level", "Work with Business Analysts, Software Engineers and Quality Analysts to implement market requirements and functional specifications. Ensure that the modified and/or newly created application components interact appropriately. Test case creation, execution, and data validity testing.")
  const jobDescription2 = await jobDescription.createjobDescription("Web Developer", "Full-time", "New York, NY", "Internship", "blablabla")
  const jobDescription3 = await jobDescription.createjobDescription("Project Manager", "Full-time", "New York, NY", "Mid-Senior", "The position will include: Providing technical and other support for Malouf Construction Field Supervision & Self-Perform crews including: CPM & Short Duration Scheduling, Assistance with Project Planning (means & methods), Quality Control Management, Budget Management, Safety Management, General Personnel Management")
  const jobDescription4 = await jobDescription.createjobDescription("Research Analyst", "Full-time", "New York, NY", "Internship", "Demonstrates proficiency in accurately compiling and analyzing large amounts of qualitative and quantitative information/data using appropriate software from all research tools that support Spotlight's suite of products, with a particular focus on assigned areas of expertise. Researches market conditions specific to area of focus to determine potential sales of a product and provides research on behalf of the customer.")
  const jobDescription5 = await jobDescription.createjobDescription("Financial Reporting Analyst", "Full-time", "Passaic, NJ", "Associate", "Bachelor’s degree in Finance, Accounting, or Business, or equivalent, and/or related business experience. CPA and five (5) or more years of experience preferred. Must have general knowledge of accounting/financial systems, internal controls and specialized knowledge of accounting/finance principles. Prefer experience in the daily operation and maintenance of general ledger accounting, cash management systems, and financial reporting.")
  const jobDescription6 = await jobDescription.createjobDescription("Software Developer", "Full-time", "New York, NY", "Associate", "We are looking for developers who want to make a career engaging in challenging projects on futuristic technology, software development, implementing software solutions, developing apps, designing games and much more within a variety of sectors such as financial, health care, energy, gaming and federal.")
  const jobDescription7 = await jobDescription.createjobDescription("Executive Assistant", "Full-time", "New York, NY", "Entry Level", "General duties: Scheduling meetings, coordinating calendars, composing emails, preparing reports, filing/scanning/organizing documents, completing paperwork, data entry, general clerical functions.")


  //Day to day duties include developing and maintaining enterprise class websites using PHP supported by the Drupal content management system platform. Responsibilities include participation in requirements gathering, application design, developing code, testing, deployment and maintenance.
  console.log("Done seeding database");
  //await db.close();
}

main();
const dbConnection = require("../data/connection");
const data = require("../data/");
const users = data.usersData;

//before executing please run the command "node tasks/seed.js once"
async function main() {
  const db = await dbConnection();
  //await db.dropDatabase();

  const recruiter1 = await users.signup("Recruiter", "christina123","christina@gmail.com", "Ball1714!");
  const recruiter2 = await users.signup("Recruiter", "munan123","munan@gmail.com ", "munan@123");
  const recruiter3 = await users.signup("Recruiter", "mohit123","mohit@gmail.com", "mohit@123");
  const recruiter4 = await users.signup("Recruiter", "peng123","peng@gmail.com", "peng@123");
  const recruiter5 = await users.signup("Recruiter", "katya123","katya@gmail.com", "katya@123");
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

  
  console.log("Done seeding database");
  //await db.close();
}

main();
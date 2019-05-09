const dbConnection = require("../data/connection");
const data = require("../data/");
const users = data.usersData;

//before executing please run the command "node tasks/seed.js once"
async function main() {
  const db = await dbConnection();
  //await db.dropDatabase();

  const user = await users.signup("Recruiter", "cli40","cwe@gmail.com", "Ball1714!");
  console.log("Done seeding database");
  //await db.close();
}

main();
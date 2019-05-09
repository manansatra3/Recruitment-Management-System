const dbConnection = require("../data/mongoConnection");
const data = require("../data/");
const users = data.usersData;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const user = await users.signup("Recruiter", "cli40","cwe@gmail.com", "Ball1714!");
  console.log("Done seeding database");
  await db.close();
}

main();
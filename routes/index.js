const jobSeekerRoutes = require ('./jobSeekerRoutes');
const loginRoutes = require("./login");

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
    app.use("/", loginRoutes);
    app.use("*", (req, res) => {
        return res.redirect("/");
    });
  };
  // hello2
  module.exports = constructorMethod;
//hello
// c
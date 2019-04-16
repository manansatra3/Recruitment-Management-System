const jobSeekerRoutes = require ('./jobSeekerRoutes');
const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const jobPosting = require('./jobPosting');

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
    app.use("/employer", jobPosting);
    app.use("/signup", signupRoutes);
    app.use("/", loginRoutes);
    app.use("*", (req, res) => {
        return res.redirect("/");
    });
  };

module.exports = constructorMethod;
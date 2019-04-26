const jobSeekerRoutes = require ('./jobSeekerRoutes');
const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const postNewJob = require('./postNewJob');
const afterSignupRoutes = require("./afterSignup");

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
    app.use("/employer", postNewJob);
    app.use("/signup", signupRoutes);
    app.use("/aftersignup", afterSignupRoutes)
    app.use("/", loginRoutes);
    app.use("*", (req, res) => {
        console.log("I was redirected");
        // return res.redirect("/");
    });
  };

module.exports = constructorMethod;
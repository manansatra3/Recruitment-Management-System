const jobSeekerRoutes = require ('./jobSeekerRoutes');
const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const afterSignupRoutes = require("./afterSignup");
const recruiterRoutes = require('./recruiterRoutes');
const afterloginRoutes = require('./afterlogin')

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
    app.use("/employer", recruiterRoutes);
    app.use("/signup", signupRoutes);
    app.use("/aftersignup", afterSignupRoutes)
    app.use("/afterlogin", afterloginRoutes)
    app.use("/", loginRoutes);
    app.use("*", (req, res) => {
        // return res.redirect("/");
    });
  };

module.exports = constructorMethod;
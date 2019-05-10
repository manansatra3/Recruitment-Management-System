const jobSeekerRoutes = require ('./jobSeekerRoutes');
const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const afterSignupRoutes = require("./afterSignup");
const recruiterRoutes = require('./recruiterRoutes');
const afterloginRoutes = require('./afterlogin')
const afterPostRoutes = require('./afterPost')
const viewJobDescriptionRoutes = require('./viewJobDescription');
const profileRoute = require('./profile');
const logOutRoute = require('./logout');
const viewApplicationForApplicant = require("./viewApplicationForApplicant")

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
    app.use("/profile", profileRoute);
    app.use("/employer", recruiterRoutes);
    app.use("/signup", signupRoutes);
    app.use("/logout", logOutRoute);
    app.use("/aftersignup", afterSignupRoutes)
    app.use("/afterlogin", afterloginRoutes)
    app.use("/login", loginRoutes)
    app.use("/", loginRoutes);
    app.use("/afterPost",afterPostRoutes)
    app.use("/viewJobDescription", viewJobDescriptionRoutes)
    app.use("/viewApplicationForApplicant", viewApplicationForApplicant)
    app.use("*", (req, res) => {
      res.status(200).json({message:"no route there"})
        // return res.redirect("/");
    });
  };

module.exports = constructorMethod;
const jobSeekerRoutes = require ('./jobSeekerRoutes');
const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const afterSignupRoutes = require("./afterSignup");
const recruiterRoutes = require('./recruiterRoutes');
const afterloginRoutes = require('./afterlogin')
const afterPostRoutes = require('./afterPost')
const viewJobDescriptionRoutes = require('./viewJobDescription')

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
    app.use("/employer", recruiterRoutes);
    app.use("/signup", signupRoutes);
    app.use("/aftersignup", afterSignupRoutes)
    app.use("/afterlogin", afterloginRoutes)
    app.use("/login", loginRoutes)
    app.use("/", loginRoutes);
    app.use("/afterPost",afterPostRoutes)
    app.use("/viewJobDescription", viewJobDescriptionRoutes)
    app.use("*", (req, res) => {
      res.status(200).json({message:"no route there"})
        // return res.redirect("/");
    });
  };

module.exports = constructorMethod;
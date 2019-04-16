const jobSeekerRoutes = require ('./jobSeekerRoutes');

const constructorMethod = app => {
    app.use("/applicant", jobSeekerRoutes);
  
    app.use("*", (req, res) => {
      res.sendStatus(404).json({error: "Route Not Found!"});
    });
  };
  
  module.exports = constructorMethod;
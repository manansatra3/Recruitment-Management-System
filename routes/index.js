const loginRoutes = require("./login");

const constructorMethod = app => {
  app.use("/", loginRoutes);

  app.use("*", (req, res) => {
   return res.redirect("/");
  });
  
};

module.exports = constructorMethod;

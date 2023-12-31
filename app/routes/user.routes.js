module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);


  // Delete a User with id
  router.delete("/:id", users.delete);

  app.use('/api/users', router);
};

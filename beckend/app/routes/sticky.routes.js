module.exports = app => {
  const stickies = require("../controllers/sticky.controller.js");

  var router = require("express").Router();

  router.post("/", stickies.create);

  router.get("/", stickies.findAll);

  router.put("/:id", stickies.update);

  router.delete("/:id", stickies.delete);

  app.use('/api/stickies', router);
};
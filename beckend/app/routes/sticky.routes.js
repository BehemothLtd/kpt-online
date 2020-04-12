module.exports = app => {
  const stickys = require("../controllers/sticky.controller.js");

  var router = require("express").Router();

  router.post("/", stickys.create);

  router.get("/", stickys.findAll);

  router.get("/:id", stickys.findOne);

  router.put("/:id", stickys.update);

  router.delete("/:id", stickys.delete);

  router.delete("/", stickys.deleteAll);

  app.use('/api/stickys', router);
};
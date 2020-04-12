module.exports = app => {
  const boards = require("../controllers/board.controller.js");

  var router = require("express").Router();

  router.post("/", boards.create);
  router.get("/:id", boards.findOne);
  router.get("/:id/cards", boards.fetchCards);
  router.post("/:id/createUser", boards.createUser);
  router.post("/:id/createCard", boards.createCard);

  app.use('/api/boards', router);
}
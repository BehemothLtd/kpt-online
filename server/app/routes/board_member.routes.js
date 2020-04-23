module.exports = app => {
  const board_members = require("../controllers/board_member.controller.js");

  var router = require("express").Router();

  router.post("/", board_members.create);

  router.get("/", board_members.findBoardsByUser);

  router.get("/:id", board_members.findUsersByBoard);

  router.delete("/:id", board_members.delete);

  app.use('/api/board_members', router);
};
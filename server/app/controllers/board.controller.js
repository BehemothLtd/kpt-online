const db = require("../models");
const jwtHelpper = require("../helpper/jwt_helpper");
const Board = db.boards;
const BoardMember = db.board_members;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }

  const board = new Board({
    name: req.body.name,
    createdBy: jwtHelpper.userInfo(req).id,
  });

  board
    .save(board)
    .then(data => {
      if (!data) res.status(500).send({ message: "Save failed" });

      const boardMember = new BoardMember({
        boardId: data.id,
        memberId: data.createdBy
      });

      boardMember
        .save(boardMember)
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  const user = jwtHelpper.userInfo(req);
  if (!user || !user.id) {
    res.status(403).send({ message: "Auth failed!" });
    return;
  }

  const query = Object.assign({}, req.body);
  query.createdBy = user.id;

  Board.find(query)
    .populate("createdBy", "name email")
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Board.findById(req.params.id)
    .populate("createdBy", "name email")
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Board.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Board.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) res.status(500).send({ message: "Delete failed" });

      BoardMember.deleteMany({ boardId: data.id })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

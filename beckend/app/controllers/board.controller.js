const db = require("../models");
const Board = db.boards;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }

  const board = new Board({
    name: req.body.name,
    created_by: 1
  });

  board
    .save(board)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Board.find(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Board.findById(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Board.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new: true })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Board.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};


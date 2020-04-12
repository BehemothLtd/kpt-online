const db = require("../models");
const Board = db.boards;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty!" });
    return;
  }

  const board = new Board({
    title: req.body.title,
    description: req.body.description,
    users: req.body.users,
    stickys: req.body.stickys,
  });

  board
    .save(board)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Board.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Board.find(condition)
    .populate("users")
    .populate("stickys")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving boards.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Board.findById(id)
    .populate("users")
    .populate("stickys")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Board with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Board with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Board.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Board with id=${id}. Maybe Board was not found!`,
        });
      } else res.send({ message: "Board was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Board with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Board.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Board with id=${id}. Maybe Board was not found!`,
        });
      } else {
        res.send({
          message: "Board was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Board with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Board.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Boards were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all boards.",
      });
    });
};

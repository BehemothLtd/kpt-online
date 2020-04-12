const db = require("../models");
const Sticky = db.stickys;

exports.create = (req, res) => {
  if (!req.body.title||!req.body.content) {
    res.status(400).send({ message: "Title||Content cannot be empty!" });
    return;
  }

  const sticky = new Sticky({
    title: req.body.title,
    content: req.body.content,
    createdBy: req.body.createdBy,
    boardId: req.body.boardId,
  });

  sticky
    .save(sticky)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sticky.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Sticky.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stickys.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Sticky.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sticky with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Sticky with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Sticky.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sticky with id=${id}. Maybe Sticky was not found!`,
        });
      } else res.send({ message: "Sticky was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sticky with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Sticky.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Sticky with id=${id}. Maybe Sticky was not found!`,
        });
      } else {
        res.send({
          message: "Sticky was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sticky with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Sticky.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Stickys were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stickys.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Sticky.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stickys.",
      });
    });
};

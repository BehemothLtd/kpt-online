const db = require("../models");
const Sticky = db.stickies;

exports.create = (req, res) => {
  const sticky = new Sticky({
    title: req.body.title,
    content: req.body.content,
    createdBy: req.body.createdBy,
    boardId: req.body.boardId,
    type: req.body.type,
  });

  sticky
    .save(sticky)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Sticky.find(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Sticky.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new: true })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Sticky.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};


const db = require('../models');
const Board = db.boards;
const Card = db.cards;
const User = db.users;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  const board = new Board({
    name: req.body.name,
  });

  board
    .save(board)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Board."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Board.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "This board is not exists" })
      } else {
        res.send({
          name: data.name,

        })
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "error retriving Board" })
    })
}

exports.fetchCards = (req, res) => {
  console.log("aaaa")
  const id = req.params.id;

  Card.find({ board: id })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "This board is not exists" })
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "error retriving Board's Cards" })
    })
}

exports.createUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.email || !req.body.name) {
      res.status(400).send({ message: "Name && Email can not be empty!" });
      return;
    }

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      board: id
    });

    await user.save(user)
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user for the board."
    });
  }
}

exports.createCard = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.type || !req.body.content || !req.body.user) {
      res.status(400).send({ message: "Name && Email can not be empty!" });
      return;
    }

    const card = new Card({
      type: req.body.type,
      content: req.body.content,
      board: id,
      user: req.body.user
    });

    await card.save(card)
    res.send(card);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user for the board."
    });
  }
}
const db = require('../models');
const Card = db.cards;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  const card = new Card({
    type: req.body.type,
    content: req.body.content,
    board: req.body.board,
    user: req.body.user
  });

  card 
    .save(card)
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

exports.findByBoard = (req, res) => {
  console.log(req.params);
  const boardId = req.params.boardId;

  Card.find({ board: boardId })
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
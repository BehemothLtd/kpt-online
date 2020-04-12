const db = require("../models");
const jwtHelpper = require("../helpper/jwt_helpper");
const BoardMember = db.board_members;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }

  const boardMember = new BoardMember({
    boardId: req.body.boardId,
    memberId: req.body.memberId
  });

  boardMember
    .save(boardMember)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findBoardsByUser = (req, res) => {
  const user = jwtHelpper.userInfo(req);
  if (!user || !user.id) {
    res.status(403).send({ message: "Auth failed!" });
    return;
  }

  BoardMember.find({ memberId: user.id })
    .populate("boardId")
    .populate({
      path: 'boardId',
      populate: {
        path: 'createdBy',
        model: 'user'
      }
    })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findUsersByBoard = (req, res) => {
  BoardMember.find({ boardId: req.body.boardId })
    .populate("memberId")
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  BoardMember.findByIdAndRemove(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

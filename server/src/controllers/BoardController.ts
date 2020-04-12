import { Request, Response } from "express";
import Board from "../model/Board";

// We'll start with allBooks which will return
// every we have from our database
export let allBoards = (req: Request, res: Response) => {
  
  let boards = Board.find((err: any, board: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(board);
    }
  });
};
export let getBoard = (req: Request, res: Response) => {
  let board = Board.findById(req.params.id, (err: any, board: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(board);
    }
  });
};
export let deleteBoard = (req: Request, res: Response) => {
  let board = Board.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully Deleted Book");
    }
  });
};
export let updateBoard = (req: Request, res: Response) => {
  console.log(req.body);
  let board = Board.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, board: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated book!");
      }
    }
  );
};
export let addBoard = (req: Request, res: Response) => {
  var board = new Board(req.body);

  board.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(board);
    }
  });
};
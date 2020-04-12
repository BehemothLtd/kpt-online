import { Request, Response } from "express";
import Sticky from "../config/mongoose-config";

// We'll start with allBooks which will return
// every we have from our database
export let allStickys = (req: Request, res: Response) => {
  
  let stickys = Sticky.find((err: any, books: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(books);
    }
  });
};
export let getSticky = (req: Request, res: Response) => {
  let sticky = Sticky.findById(req.params.id, (err: any, sticky: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(sticky);
    }
  });
};
export let deleteSticky = (req: Request, res: Response) => {
  let sticky = Sticky.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully Deleted Book");
    }
  });
};
export let updateSticky = (req: Request, res: Response) => {
  console.log(req.body);
  let sticky = Sticky.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, sticky: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated book!");
      }
    }
  );
};
export let addSticky = (req: Request, res: Response) => {
  var sticky = new Sticky(req.body);

  sticky.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(sticky);
    }
  });
};
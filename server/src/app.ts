import express, { Request, Response } from "express";

import * as stickyController from "./controllers/StickyController";
import * as boardController from "./controllers/BoardController";

// Our Express APP config
const app = express();
app.use(express.json());
app.set("port", 3000);

// API Endpoints
app.get("/", (req: Request, res: Response) => res.send("hi"));
app.get("/stickys", stickyController.allStickys);
app.get("/sticky/:id", stickyController.getSticky);
app.post("/sticky", stickyController.addSticky);
app.put("/sticky/:id", stickyController.updateSticky);
app.delete("/sticky/:id", stickyController.deleteSticky);

// Board Endpoints
app.get("/", (req: Request, res: Response) => res.send("hi"));
app.get("/boards", boardController.allBoards);
app.get("/board/:id", boardController.getBoard);
app.post("/board", boardController.addBoard);
app.put("/board/:id", boardController.updateBoard);
app.delete("/board/:id", boardController.deleteBoard);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});
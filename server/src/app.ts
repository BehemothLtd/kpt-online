import express, { Request, Response } from "express";

import * as stickyController from "./controllers/StickyController";

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

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});
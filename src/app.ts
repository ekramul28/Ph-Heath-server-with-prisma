import express, { Application, Request, Response } from "express";

import cors from "cors";
import { UserRoute } from "./app/modules/User/user.router";

const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "server is running",
  });
});

app.use("/api/v1/user", UserRoute);

export default app;

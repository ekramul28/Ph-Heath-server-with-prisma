import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Route is working perfectly" });
});

export const UserRoute = router;

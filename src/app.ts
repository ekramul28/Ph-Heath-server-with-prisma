import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import cors from "cors";

import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandaler";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "server is running",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api Not Found",
    error: {
      path: req.originalUrl,
      message: `${req.originalUrl} This Path is not valid`,
    },
  });
});
export default app;

import { Request, Response } from "express";
import catchAsync from "../../middlewares/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.loginUser(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};

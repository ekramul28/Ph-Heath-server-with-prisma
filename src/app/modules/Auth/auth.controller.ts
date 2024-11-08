import { Request, Response } from "express";
import catchAsync from "../../middlewares/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  //    const { refreshToken } = result;
  //   res.cookie("refreshToken", refreshToken, {
  //     secure: false,
  //     httpOnly: true,
  //   });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In successfully",
    data: result,
    //     data: {
    //       accessToken: result.accessToken,
    //       needPasswordChange: result.needPasswordChange,
    //     },
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};

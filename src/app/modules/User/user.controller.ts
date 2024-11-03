import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createAdminIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Admin Created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err?.message || "something went wrong",
      error: err,
    });
  }
};

export const UserController = {
  createAdmin,
};

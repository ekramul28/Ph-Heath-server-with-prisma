import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAdmin = async (req: Request, res: Response) => {
  const result = await AdminService.getAdminFromDB();
  res.status(200).json({
    message: "Admin get successfully",
    data: result,
  });
};

export const AdminController = {
  getAdmin,
};

import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log("this is option", options);
    const result = await AdminService.getAdminFromDB(filters, options);
    res.status(200).json({
      message: "Admin get successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || "something went wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAdmin,
};

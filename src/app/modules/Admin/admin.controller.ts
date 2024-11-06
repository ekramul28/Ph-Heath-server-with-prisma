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
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || "something went wrong",
      error: error,
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.getAdminByIdFromDB(id);
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

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await AdminService.updateAdminFromDB(id, req.body);
    res.status(200).json({
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || "something went wrong",
      error: error,
    });
  }
};
const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await AdminService.deleteAdminFromDB(id);
    res.status(200).json({
      message: "Admin delete successfully",
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
  getAdminById,
  updateAdmin,
  deleteAdmin,
};

import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log("this is option", options);
    const result = await AdminService.getAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await AdminService.getAdminByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data fetched",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AdminService.updateAdminFromDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Updated Successful ",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AdminService.deleteAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delete Successful",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const softDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await AdminService.softDeleteAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delete Successful",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const AdminController = {
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};

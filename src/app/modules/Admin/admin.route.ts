import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";

import validateRequest from "../../middlewares/validateRequest";
import { update } from "./admin.validation";
const route = express.Router();

route.get("/", AdminController.getAdmin);
route.get("/:id", AdminController.getAdminById);
route.patch("/:id", validateRequest(update), AdminController.updateAdmin);
route.delete("/:id", AdminController.deleteAdmin);
route.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRouter = route;

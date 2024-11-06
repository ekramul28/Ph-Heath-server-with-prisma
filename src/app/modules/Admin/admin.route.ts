import express from "express";
import { AdminController } from "./admin.controller";
const route = express.Router();

route.get("/", AdminController.getAdmin);
route.get("/:id", AdminController.getAdminById);
route.patch("/:id", AdminController.updateAdmin);
route.delete("/:id", AdminController.updateAdmin);

export const AdminRouter = route;

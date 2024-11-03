import express from "express";
import { AdminController } from "./admin.controller";
const route = express.Router();

route.get("/", AdminController.getAdmin);

export const AdminRouter = route;

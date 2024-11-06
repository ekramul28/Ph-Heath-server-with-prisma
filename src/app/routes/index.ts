import express from "express";
import { UserRoute } from "../modules/User/user.router";
import { AdminRouter } from "../modules/Admin/admin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoute,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;

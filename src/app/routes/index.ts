import express from "express";
import { UserRoute } from "../modules/User/user.router";
import { AdminRouter } from "../modules/Admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

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
  {
    path: "/auth",
    router: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;

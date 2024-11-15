import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../helpars/jwtHelpers";
import config from "../../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(token);

      if (!token) {
        throw new Error("You are not authorized!");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_secret as string
      );

      console.log(verifiedUser);
      if (!roles.length && roles.includes(verifiedUser.role)) {
        throw new Error("You are not authorized!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;

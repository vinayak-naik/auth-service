import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const userData = res.locals.data;

  if (!userData) {
    const errorMessage = "You don't have permission to access this route.";
    return sendResponse(res, 400, false, null, errorMessage);
  }

  return next();
};

export default requireUser;

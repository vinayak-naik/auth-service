import { autoInjectable } from "tsyringe";
import UserService from "../services/user.service";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

@autoInjectable()
export default class UserController {
  service: UserService;
  constructor(service?: UserService) {
    this.service = service;
  }

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email or password";
      // Check existing user

      const response = await this.service.getUserByEmail(req.body.email);
      const user = response.data.data;
      if (!user) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      const compare = await bcrypt.compare(req.body.password, user.password);
      if (!compare) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }
      const accessToken = await this.service.signAccessToken(user);

      // sign a refresh token
      const refreshToken = await this.service.signRefreshToken(user);
      const successMessage = "Logged in successfully";
      sendResponse(res, 200, true, { accessToken, refreshToken }, successMessage);
    } catch (error) {
      next(error);
    }
  };
}

import { autoInjectable } from "tsyringe";
import MicroserviceService from "../services/microservice.service";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

@autoInjectable()
export default class MicroserviceController {
  service: MicroserviceService;
  constructor(service?: MicroserviceService) {
    this.service = service;
  }

  getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email or password";
      // Check existing microservice

      const response = await this.service.getMicroserviceById(req.params.id);
      console.log("response=============", response);
      const microservice = response.data.data;
      if (!microservice) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      const accessToken = await this.service.signAccessToken(microservice);

      // sign a refresh token
      const refreshToken = await this.service.signRefreshToken(microservice);
      const successMessage = "Token created successfully";
      sendResponse(res, 200, true, { accessToken, refreshToken }, successMessage);
    } catch (error) {
      next(error);
    }
  };
}

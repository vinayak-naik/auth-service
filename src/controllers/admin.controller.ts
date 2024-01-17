import { autoInjectable } from "tsyringe";
import bcrypt from "bcrypt";
import AdminService from "../services/admin.service";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import sendEmail from "../utils/mailer";
import config from "config";
import { generateOTP } from "../utils/generateOTP";
import { generateEmailTemplateForOTP } from "../utils/emailTemplate";

@autoInjectable()
export default class AdminController {
  service: AdminService<any>;
  constructor(service?: AdminService<any>) {
    this.service = service;
  }

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email";
      // Check existing admin
      const responseData = await this.service.getAdminByEmail(req.body.email);
      const admin = responseData.data.data;
      if (!admin) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }
      // Generate OTP
      const otp = generateOTP();

      // Hash OTP
      const hash = (await bcrypt.hash(otp, 10)) as string;

      // Add OTP to admin ddocument updateAdminByEmail
      await this.service.updateAdminByEmail(req.body.email, hash);

      // Create email template for OTP
      const template = generateEmailTemplateForOTP(admin.firstName, admin.lastName, otp);

      // ======UPDATE REQUIRED=====
      // Send OTP to admin email
      const response = true as boolean;
      // const response = (await sendEmail({
      //   to: admin.email,
      //   from: config.get("senderEmail"),
      //   subject: "Email Verification, Sanjeevini",
      //   html: template,
      // })) as boolean;

      // If failed to send OTP
      if (!response) {
        const failedEmailMessage = "Failed to send OTP";
        sendResponse(res, 400, false, null, failedEmailMessage);
        return;
      }

      // Send success response
      const successMessage = "OTP sent successfully";
      sendResponse(res, 200, true, null, successMessage);
    } catch (error) {
      // Skip function with error if any error occurs
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    // Check existing admin
    try {
      const responseData = await this.service.getAdminByEmail(req.body.email);
      const admin = responseData.data.data;
      if (!admin) {
        const failedMessage = "Invalid email or password";
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      // ======UPDATE REQUIRED=====
      // Compare verification code
      const compare = true as boolean;
      // const compare = (await bcrypt.compare(req.body.verificationCode, admin.verificationCode)) as boolean;

      // If verification code doesn't match
      if (!compare) {
        const verificationFailedMessage = "Verification Failed";
        sendResponse(res, 403, false, null, verificationFailedMessage);
        return;
      }

      // sign a access token
      const accessToken = (await this.service.signAccessToken(admin)) as string;

      // sign a refresh token
      const refreshToken = (await this.service.signRefreshToken(admin)) as string;

      // Send success response
      const successMessage = "Logged in successfully";
      sendResponse(res, 200, true, { accessToken, refreshToken }, successMessage);
    } catch (error) {
      // Skip function with error if any error occurs
      next(error);
    }
  };
}

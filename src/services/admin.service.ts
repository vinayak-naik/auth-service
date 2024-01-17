import { injectable } from "tsyringe";
import AdminSI from "../interfaces/admin.interface";

import { signJwt } from "../utils/jwt";
import config from "config";
import { httpRequest } from "../utils/httpRequest";

@injectable()
export default class AdminService<T> {
  getAdminByEmail = async (email: string) => {
    const userServiceUrl = config.get<string>("userServiceUrl");
    return httpRequest("POST", `${userServiceUrl}/admin`, { email });
  };

  updateAdminByEmail = async (email: string, verificationCode: string) => {
    const userServiceUrl = config.get<string>("userServiceUrl");
    return httpRequest("PATCH", `${userServiceUrl}/admin/update`, { email, verificationCode });
  };

  // getAdmin = async (data: T): Promise<T> => {
  //   const admin: any = {
  //     firstName: "Vinayak",
  //     lastName: "Naik",
  //     email: "vinayaknaik7259@gmail.com",
  //     role: "admin --fake response",
  //     verificationCode: "$2b$10$pOlMhmTuExQtPH1HBivORu95PcduOVXlFwDGF.qR67tBORws58i7u",
  //     balance: 0,
  //   };
  //   return admin;
  // };
  // findAdminAndUpdate = async (match: T, update: T): Promise<T> => {
  //   logger.info("match=============", match);
  //   logger.info("update=============", update);
  //   const admin: any = {
  //     firstName: "Vinayak",
  //     lastName: "Naik",
  //     email: "vinayaknaik7259@gmail.com",
  //     role: "admin --fake response",
  //     verificationCode: "1234566",
  //     balance: 0,
  //   };
  //   return admin;
  // };

  signAccessToken = async (admin: AdminSI): Promise<string> => {
    // const payload = omit(admin.toJSON(), ["password"]);

    const accessTokenPayload = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };
  signRefreshToken = async (admin: AdminSI): Promise<string> => {
    const refreshTokenPayload = {
      adminId: admin._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}

import { injectable } from "tsyringe";
import UserSI from "../interfaces/user.interface";
import { signJwt } from "../utils/jwt";
import config from "config";
import { httpRequest } from "../utils/httpRequest";

@injectable()
export default class UserService {
  getUserByEmail = async (email: string) => {
    const userServiceUrl = config.get<string>("userServiceUrl");
    return httpRequest("POST", `${userServiceUrl}/user`, { email });
  };

  signAccessToken = async (user: UserSI) => {
    // const payload = omit(user.toJSON(), ["password"]);

    const accessTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };

  signRefreshToken = async (user: UserSI) => {
    const refreshTokenPayload = {
      userId: user._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}

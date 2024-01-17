import { injectable } from "tsyringe";
import MicroserviceSI from "../interfaces/microservice.interface";
import { signJwt } from "../utils/jwt";
import config from "config";
import { httpRequest } from "../utils/httpRequest";

@injectable()
export default class MicroserviceService {
  getMicroserviceById = async (id: string) => {
    const microserviceServiceUrl = config.get<string>("userServiceUrl");
    return httpRequest("GET", `${microserviceServiceUrl}/microservice/${id}`, {});
  };

  signAccessToken = async (microservice: MicroserviceSI) => {
    // const payload = omit(microservice.toJSON(), ["password"]);

    const accessTokenPayload = {
      name: microservice.name,
      role: microservice.role,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };

  signRefreshToken = async (microservice: MicroserviceSI) => {
    const refreshTokenPayload = {
      microserviceId: microservice._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}

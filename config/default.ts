export default {
  port: 4001,
  mongoUri: "mongodb://localhost:27017/sanjeevini",
  logLevel: "info",
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
  accessTokenExpiration: "50m",
  refreshTokenExpiration: "1y",
  senderEmail: "",
  senderEmailPassword: "",
  userServiceUrl: "http://localhost:4002/user/api",
};

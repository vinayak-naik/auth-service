import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";
import microserviceRouter from "./microservice.route";
import sendResponse from "../utils/sendResponse";

const indexRouter = Router();

indexRouter.get("/test", (req, res) => sendResponse(res, 200, true, null, "Auth service is running"));

indexRouter.use("/admin", adminRouter);

indexRouter.use("/user", userRouter);

indexRouter.use("/microservice", microserviceRouter);

export default indexRouter;

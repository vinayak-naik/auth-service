import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";
import microserviceRouter from "./microservice.route";

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("Server is running"));

indexRouter.use("/admin", adminRouter);

indexRouter.use("/user", userRouter);
indexRouter.use("/microservice", microserviceRouter);

export default indexRouter;

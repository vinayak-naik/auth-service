import { Router } from "express";
import UserController from "../controllers/user.controller";
import validateResource from "../middleware/validateResource";
import { loginUserSchema } from "../schema/user.schema";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/login", validateResource(loginUserSchema), userController.loginUser);

export default userRouter;

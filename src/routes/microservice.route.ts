import { Router } from "express";
import MicroserviceController from "../controllers/microservice.controller";
import requireAdmin from "../middleware/requireAdmin";

const microserviceRouter = Router();
const microserviceController = new MicroserviceController();

microserviceRouter.get("/getToken/:id", requireAdmin, microserviceController.getToken);

export default microserviceRouter;

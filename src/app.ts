require("dotenv").config();
import "reflect-metadata";
import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.route";
import errorHandler from "./middleware/error/api-error-handler";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(cors());

app.use(express.json());

app.use(deserializeUser);

app.use("/auth/api", indexRouter);

app.use(errorHandler);

export default app;

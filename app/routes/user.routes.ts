import express, { Application } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = express.Router();

const setupUserRoutes = (app: Application) => {
  userRouter.get("/", userController.findAll);
  userRouter.put("/update-balance", userController.updateBalance);
  app.use("/api/user", userRouter);
};

export default setupUserRoutes;

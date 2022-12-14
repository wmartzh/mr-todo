import { Application } from "express";
import exampleRouter from "./example";
import authRouter from "./auth";
import taskRouter from "./task";
import subscriptionRouter from "./subscription";
import subjectRouter from "./subject";
import { authMiddleware } from "../middlewares/auth.middleware";



export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/", exampleRouter);
  app.use("/auth", authRouter);
  app.use("/tasks", authMiddleware, taskRouter);
  app.use("/subject", authMiddleware, subjectRouter);
  app.use("/subscription", subscriptionRouter);

}

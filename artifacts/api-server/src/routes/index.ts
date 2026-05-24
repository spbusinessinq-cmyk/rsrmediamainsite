import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import reportsRouter from "./reports";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(reportsRouter);
router.use(storageRouter);

export default router;

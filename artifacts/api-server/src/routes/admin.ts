import { Router, type IRouter, type Request, type Response } from "express";
import { AdminLoginBody } from "@workspace/api-zod";
import {
  checkPasscode,
  clearAdminCookie,
  isAdmin,
  setAdminCookie,
} from "../middleware/adminAuth";

const router: IRouter = Router();

router.post("/admin/login", (req: Request, res: Response): void => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  if (!checkPasscode(parsed.data.passcode)) {
    req.log.warn({ ip: req.ip }, "admin.login.failed");
    res.status(401).json({ error: "Invalid passcode" });
    return;
  }
  setAdminCookie(res);
  req.log.info("admin.login.success");
  res.json({ authenticated: true });
});

router.post("/admin/logout", (_req: Request, res: Response): void => {
  clearAdminCookie(res);
  res.json({ authenticated: false });
});

router.get("/admin/session", (req: Request, res: Response): void => {
  res.json({ authenticated: isAdmin(req) });
});

export default router;

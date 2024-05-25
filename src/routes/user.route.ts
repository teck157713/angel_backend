import { Router } from "express";
import { register, getUserPreferences } from "../controllers/user.controller";

const router = Router();

router.post("/register", register);
router.post("/getUserPreferences", getUserPreferences);

export const UserRoutes = router;

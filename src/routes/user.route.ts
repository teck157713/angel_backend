import { Router } from "express";
import { saveUserPreferences, getUserPreferences } from "../controllers/user.controller";

const router = Router();

router.post("/saveUserPreferences", saveUserPreferences);
router.post("/getUserPreferences", getUserPreferences);

export const UserRoutes = router;

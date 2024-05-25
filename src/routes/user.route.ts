import { Router } from "express";
import { register } from "../controllers/user.controller.ts";

const router = Router();

router.post("/register", register);

export const UserRoutes = router;

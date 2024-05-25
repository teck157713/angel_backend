import { Router } from "express";
import { createCheckoutSession, webhook } from "../controllers/payment.controller";

const router = Router();

router.post("/createCheckoutSession", createCheckoutSession);
router.post("/", webhook);

export const PaymentRoutes = router;

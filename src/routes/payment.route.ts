import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller";

const router = Router();

router.post("/createCheckoutSession", createCheckoutSession);

export const PaymentRoutes = router;

import { Router } from "express";
import { getAmount } from "../controllers/transaction.controller";

const router = Router();

router.post("/getAmount", getAmount);

export const TransactionRoutes = router;

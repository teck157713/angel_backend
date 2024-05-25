import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/user.route";
import { PaymentRoutes } from "./routes/payment.route";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", UserRoutes);
app.use("/payments", PaymentRoutes);

export const server = app;

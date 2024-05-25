import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/user.route";
import { TransactionRoutes } from "./routes/transaction.route";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", UserRoutes);
app.use("/transactions", TransactionRoutes);

export const server = app;

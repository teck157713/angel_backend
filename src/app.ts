import express from "express";
import cors from "cors";
import { UserRoutes } from "./routes/user.route";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", UserRoutes);

export const server = app;

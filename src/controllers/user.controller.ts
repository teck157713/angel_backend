import { Request, Response } from "express";
import { auth } from "../firebase"
import { RegisterRequest } from "../models/user.model.ts";

export const register = async (req: Request, res: Response) => {
    const model = req.body as RegisterRequest;

    try {
        await auth.createUser({
            disabled: false,
            displayName: `${model.firstName} ${model.lastName}`,
            email: model.email,
            emailVerified: false,
            password: model.password,
        });

        res.status(200).send("");
    }
    catch (error) {
        res.status(400).json(error);
    }
}

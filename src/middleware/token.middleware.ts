import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase";
import http from "http";

const unauthorizedRoutes: string[] = [
    "/users/register",
    "/payments/webhook"
]

export const getUID = async (req: Request | http.IncomingMessage) => {
    if (unauthorizedRoutes.includes(req.url || "")) {
        return "";
    }

    const authorization = req.headers["authorization"] || req.headers["cookie"]?.substring("X-Authorization=".length);

    if (!authorization) {
        throw {
            code: "unauthorized",
            message: "Need to be signed in to call this"
        };
    }

    const bearer = authorization.split(" ");
    const token = bearer[1];

    await auth.verifyIdToken(token);

    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).sub;
}

export const token = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await getUID(req);

        if (results) {
            req.app.locals.uid = results;
        }

        next();
    }
    catch (error) {
        res.status(400).json(error);
    }
}

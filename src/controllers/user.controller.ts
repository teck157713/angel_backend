import { Request, Response } from "express";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { saveUserPreferences, getUserPreferences } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
    const model = req.body as saveUserPreferences;

    try {
        await auth.createUser({
            disabled: false,
            displayName: `${model.firstName} ${model.lastName}`,
            email: model.email,
            emailVerified: false,
            password: model.password,
        });
        

        const snapshot = await firestore
            .doc((`/users/${model.uid}`))
            .set({
                uid: model.uid,
                firstName: model.firstName,
                lastName: model.lastName,
                email: model.email,
                password: model.password,
                donationlimit: model.donationlimit,
                donationpref: model.donationpref
            });

        res.status(200).send("");
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getUserPrefr = async (req: Request, res: Response) => {
    const model = req.body as getUserPreferences;
    try {
        const draftInvoiceReq = req.body as getUserPreferences;
        const snapshot = await firestore
            .doc(`/users/${model.uid}`)
            .get();
        res.status(200).json(snapshot.data() || []);
    }
    catch (error) {
        res.status(400).json(error);
    }
}
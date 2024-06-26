import { Request, Response } from "express";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { saveUserPreferencesModel, getUserPreferencesModel } from "../models/user.model";

export const saveUserPreferences = async (req: Request, res: Response) => {
    const model = req.body as saveUserPreferencesModel;

    try {

        await firestore
            .doc((`/users/${model.uid}`))
            .set({
                uid: model.uid,
                donationlimit: model.donationlimit,
                donationpref: model.donationpref
            });

        res.status(200).send("");
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getUserPreferences = async (req: Request, res: Response) => {
    const model = req.body as getUserPreferencesModel;
    try {
        const snapshot = await firestore
            .doc(`/users/${model.uid}`)
            .get();
        res.status(200).json(snapshot.data() || null);
    }
    catch (error) {
        res.status(400).json(error);
    }
}
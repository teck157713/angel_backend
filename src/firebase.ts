import { credential } from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
    process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

const app = initializeApp({
    credential: credential.cert({
        "projectId": process.env.PROJECT_ID,
        "clientEmail": process.env.CLIENT_EMAIL,
        "privateKey": Buffer.from(process.env.PRIVATE_KEY || "", "base64").toString().replace(/\\n/gm, "\n")
    })
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);

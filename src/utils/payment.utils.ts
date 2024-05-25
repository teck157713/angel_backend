import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../firebase";

export const getTransactionInformation = async (uid: string, originalAmount: number) => {
    // Get the user's donation limit
    const userPreferenceSnapshot = await firestore
        .doc(`/users/${uid}`)
        .get();

    const limit = userPreferenceSnapshot.data()?.donationlimit;

    // Get the total donated amount this month
    const now = new Date();
    const transactionSnapshots = await firestore
        .collection(`/users/${uid}/transactions`)
        .where("status", "==", "PAID")
        .where("date", ">", Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)))
        .get();

    const totalDonatedAmount = transactionSnapshots.docs.reduce((acc, curr) => acc += curr.data()?.donatedAmount || 0, 0);

    // Do not do donations if it exceeds the limmit!
    if (limit && totalDonatedAmount >= limit) {
        return {
            totalAmount: originalAmount,
            donatedAmount: 0,
            originalAmount,
            taxDeducted: 0
        }
    }

    const totalAmount = Math.ceil(originalAmount);
    const donatedAmount = parseFloat((totalAmount - originalAmount).toFixed(2));
    const taxDeducted = parseFloat((donatedAmount * 2.5).toFixed(2));

    return {
        totalAmount,
        donatedAmount,
        originalAmount,
        taxDeducted
    }
}

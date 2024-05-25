import { Timestamp } from "firebase-admin/firestore"

export interface GetAmountRequest {
    uid: string,
    timeframe?: "M" | "Y"
}

export interface TransactionModel {
    id: string,
    date: Timestamp,
    donatedAmount?: number,
    originalAmount: number,
    taxDeducted?: number,
    totalAmount: number
}

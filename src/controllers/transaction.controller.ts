import { Request, Response } from "express";
import { GetAmountRequest } from "../models/transaction.model";
import { firestore } from "../firebase";

export const getAmount = async (req: Request, res: Response) => {
    const model = req.body as GetAmountRequest;
console.log("get amount")
    try {
        const now = new Date();

        let query: any = firestore.collection(`/users/${model.uid}/transactions`);
console.log("aaa")
        switch (model.timeframe) {
            case "M":
                query = query.where("date", ">", new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0));
                break;
            case "Y":
                query = query.where("date", ">", new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0));
                break;
        }

        const transactionSnapshots = await query.get();

        const totalAmountInformation = transactionSnapshots.docs.reduce(
            (acc: any, curr: any) => ({
                totalAmount: acc.totalAmount + curr.data()?.totalAmount || 0,
                donatedAmount: acc.donatedAmount + curr.data()?.donatedAmount || 0,
                taxDeducted: acc.taxDeducted + curr.data()?.taxDeducted || 0,
            }),
            {
                totalAmount: 0,
                donatedAmount: 0,
                taxDeducted: 0
            }
        );
        
        res.status(200).json(totalAmountInformation);
    }
    catch (error) {
        res.status(400).json(error);
    }
}
import { Request, Response } from "express";
import { getTransactionInformation } from "../utils/payment.utils";
import { stripe } from "../utils/stripe.utils";
import { firestore } from "../firebase";
import { Timestamp } from "firebase-admin/firestore";

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const totalOriginalAmount = req.body.products.reduce((acc: number, curr: any) => acc += curr.price_data.unit_amount * 0.01, 0);
        const amountInformation = await getTransactionInformation(req.body.uid, totalOriginalAmount);
        const lineItems = req.body.products;

        if (amountInformation.donatedAmount > 0) {
            lineItems.push({
                price_data: {
                    currency: "sgd",
                    product_data: {
                        name: "Donation Amount"
                    },
                    unit_amount: amountInformation.donatedAmount * 100
                },
                quantity: 1
            })
        }

        const transferGroup = crypto.randomUUID();

        await firestore
            .collection(`/users/${req.body.uid}/transactions`)
            .add({
                date: Timestamp.fromDate(new Date()),
                donatedAmount: amountInformation.donatedAmount,
                originalAmount: amountInformation.originalAmount,
                status: "PENDING",
                transferGroup,
                taxDeducted: amountInformation.taxDeducted,
                totalAmount: amountInformation.totalAmount
            })
        
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_intent_data: {
                transfer_group: transferGroup,
            },
            mode: "payment",
            success_url: req.body.successUrl,
            cancel_url: req.body.cancelUrl
        });

        res.status(200).json({
            url: session.url
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}
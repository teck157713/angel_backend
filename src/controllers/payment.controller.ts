import { Request, Response } from "express";
import { firestore } from "../firebase";
import { stripe } from "../utils/stripe.utils";

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const token: string = req.body.uid;
        const amount = req.body.originalAmount;
        const total = await stripe.charges.create({
            amount: amount * 100,
            currency: 'sgd',
            source: token,
            description: 'Donation'
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_11PK0yyAolTCNC7wTZkpM0Bi0',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `localhost:5173?success=true`,
            cancel_url: `localhost:5173?canceled=true`,
        });
        
        res.redirect( 303, session.url || "" );
    }
    catch (error) {
        res.status(400).json(error);
    }
}
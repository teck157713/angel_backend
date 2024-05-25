import stripeConstructor from "stripe";

export const stripe = new stripeConstructor(
    // This is your test secret API key.
    process.env.STRIPE_API || ""
);
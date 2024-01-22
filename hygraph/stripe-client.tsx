import Stripe from 'stripe';
export default new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST as string
);

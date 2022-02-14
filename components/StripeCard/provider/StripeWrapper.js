import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_API_KEY);

function StripeWrapper({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default StripeWrapper;

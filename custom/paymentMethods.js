import ExampleIOUPaymentForm from "@reactioncommerce/components/ExampleIOUPaymentForm/v1";
import StripeCard from "components/StripeCard";

const paymentMethods = [
  {
    displayName: "IOU",
    InputComponent: ExampleIOUPaymentForm,
    name: "iou_example",
    shouldCollectBillingAddress: true
  },
  {
    displayName: "Credit Card (SCA)",
    InputComponent: StripeCard,
    name: "stripe_payment_intent",
    shouldCollectBillingAddress: true
  }
];

export default paymentMethods;

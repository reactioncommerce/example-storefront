import ExampleIOUPaymentForm from "../components/ExampleIOUPaymentForm";
import StripePaymentInput from "../components/StripePaymentInput";

const paymentMethods = [
  {
    displayName: "Credit Card",
    InputComponent: StripePaymentInput,
    name: "stripe_card",
    shouldCollectBillingAddress: true
  },
  {
    displayName: "IOU",
    InputComponent: ExampleIOUPaymentForm,
    name: "iou_example",
    shouldCollectBillingAddress: true
  }
];

export default paymentMethods;

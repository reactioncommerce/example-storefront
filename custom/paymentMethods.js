import ExampleIOUPaymentForm from "@reactioncommerce/components/ExampleIOUPaymentForm/v1";
import StripePaymentInput from "@reactioncommerce/components/StripePaymentInput/v1";

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

import ExampleIOUPaymentForm from "@reactioncommerce/components/ExampleIOUPaymentForm/v1";
import StripePaymentInput from "@reactioncommerce/components/StripePaymentInput/v1";
import UnboxPayflowForm from "./unbox/payments/paypal/payflow/unbox-payflow"

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
  },
  {
    displayName: "Paypal - Payflow",
    InputComponent: UnboxPayflowForm,
    name: "unbox_payflow",
    shouldCollectBillingAddress: true,
  },
];

export default paymentMethods;

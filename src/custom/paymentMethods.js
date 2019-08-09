import ExampleIOUPaymentForm from "@reactioncommerce/components/ExampleIOUPaymentForm/v1";
import StripePaymentInput from "@reactioncommerce/components/StripePaymentInput/v1";
import UnboxPayflowForm from "./unbox/payments/paypal/payflow/unbox-payflow"
import UnboxPayBoleto from "./unbox/payments/unboxPay/boleto/UnboxPayBoleto";
import UnboxPayCredit from "./unbox/payments/unboxPay/credit/UnboxPayCredit";

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
  {
    displayName: "Unboxpay - Boleto",
    InputComponent: UnboxPayBoleto,
    name: "unboxpay_boleto",
    shouldCollectBillingAddress: true,
  },
  {
    displayName: "Unboxpay - Credit Card",
    InputComponent: UnboxPayCredit,
    name: "unboxpay_credit",
    shouldCollectBillingAddress: true,
  },
];

export default paymentMethods;

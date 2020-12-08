/* eslint-disable react/no-multi-comp */
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import styled from "styled-components";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import PaymentsCheckoutAction from "@reactioncommerce/components/PaymentsCheckoutAction/v1";
import FinalReviewCheckoutAction from "@reactioncommerce/components/FinalReviewCheckoutAction/v1";
import { addTypographyStyles } from "@reactioncommerce/components/utils";
import Dialog from "@material-ui/core/Dialog";
import PageLoading from "components/PageLoading";
import Router from "translations/i18nRouter";
import calculateRemainderDue from "lib/utils/calculateRemainderDue";
import useTrackerEvents from "hooks/analytics/useTrackerEvents";
import { placeOrderMutation } from "../../hooks/orders/placeOrder.gql";

const MessageDiv = styled.div`
  ${addTypographyStyles("NoPaymentMethodsMessage", "bodyText")}
`;

const NoPaymentMethodsMessage = () => <MessageDiv>No payment methods available</MessageDiv>;

NoPaymentMethodsMessage.renderComplete = () => "";

const CheckoutActions = (props) => {
  const {
    checkoutMutations: { onSetShippingAddress, onSetFulfillmentOption },
    cart,
    cartStore,
    orderEmailAddress,
    clearAuthenticatedUsersCart,
    paymentMethods,
    addressValidation,
    addressValidationResults
  } = props;

  const {
    trackCheckoutStartedEvent,
    trackCheckoutStepViewed,
    trackCheckoutStepCompleted,
    trackOrderCompleted,
    trackPaymentInfoEntered
  } = useTrackerEvents();

  const { checkout: { fulfillmentGroups, summary }, items } = cart;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [hasPaymentError, setHasPaymentError] = useState(false);
  const [prevAddressValidationResults, setPrevAddressValidationResults] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [actionAlerts, setActionAlerts] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const handleActionAlerts = (action) => {
    setActionAlerts({ ...actionAlerts, ...action });
  };

  useEffect(() => {
    setSelectedPaymentMethod(paymentMethodData());
    setSelectedShippingMethod(shippingMethodData());
  }, [cart, cartStore]);

  useEffect(() => {
    trackCheckoutStartedEvent({ cart });

    const [fulfillmentGroup] = fulfillmentGroups;

    if (
      addressValidationResults &&
      prevAddressValidationResults &&
      !isEqual(addressValidationResults, prevAddressValidationResults)
    ) {
      handleValidationErrors();
    }

    // Track the first step, "Enter a shipping address" when the page renders,
    // as it will be expanded by default, only record this event when the
    // shipping address has not yet been set.
    if (!fulfillmentGroup.shippingAddress) {
      trackCheckoutStepViewed({
        step: 1,
        checkout_id: cart._id, // eslint-disable-line camelcase
        payment_method: selectedPaymentMethod, // eslint-disable-line camelcase
        shipping_method: selectedShippingMethod // eslint-disable-line camelcase
      });
    }

    return setPrevAddressValidationResults(addressValidationResults);
  }, []);

  const shippingMethodData = () => {
    const { selectedFulfillmentOption } = fulfillmentGroups[0];
    return selectedFulfillmentOption ? selectedFulfillmentOption.fulfillmentMethod.displayName : null;
  };

  const paymentMethodData = () => {
    const [firstPayment] = cartStore.checkoutPayments;
    return firstPayment ? firstPayment.payment.method : null;
  };

  const setShippingAddress = async (address) => {
    delete address.isValid;
    const { data, error } = await onSetShippingAddress(address);

    if (data && !error) {
      handleActionAlerts({ 1: {} });

      // track successfully setting a shipping address
      trackCheckoutStepCompleted({
        step: 1,
        checkout_id: cart._id, // eslint-disable-line camelcase
        payment_method: selectedPaymentMethod, // eslint-disable-line camelcase
        shipping_method: selectedShippingMethod // eslint-disable-line camelcase
      });

      // The next step will automatically be expanded, so lets track that
      trackCheckoutStepViewed({
        step: 2,
        checkout_id: cart._id, // eslint-disable-line camelcase
        payment_method: selectedPaymentMethod, // eslint-disable-line camelcase
        shipping_method: selectedShippingMethod // eslint-disable-line camelcase
      });
    }
  };

  const handleValidationErrors = () => {
    const { validationErrors } = addressValidationResults || [];
    const shippingAlert = validationErrors && validationErrors.length ? {
      alertType: validationErrors[0].type,
      title: validationErrors[0].summary,
      message: validationErrors[0].details
    } : null;

    handleActionAlerts({ 1: shippingAlert });
  };

  const setShippingMethod = async (shippingMethodData) => {
    const fulfillmentOption = {
      fulfillmentGroupId: fulfillmentGroups[0]._id,
      fulfillmentMethodId: shippingMethodData.selectedFulfillmentOption.fulfillmentMethod._id
    };

    const { data, error } = await onSetFulfillmentOption(fulfillmentOption);
    if (data && !error) {
      const { selectFulfillmentOptionForGroup: { cart } } = data;
      const { checkout: { fulfillmentGroups } } = cart;
      const selectedShipping = fulfillmentGroups[0]?.selectedFulfillmentOption?.fulfillmentMethod?.displayName;

      setSelectedShippingMethod(selectedShipping);
      // track successfully setting a shipping method
      trackCheckoutStepCompleted({
        step: 2,
        checkout_id: cart._id, // eslint-disable-line camelcase
        payment_method: selectedPaymentMethod, // eslint-disable-line camelcase
        shipping_method: selectedShipping // eslint-disable-line camelcase
      });

      // The next step will automatically be expanded, so lets track that
      trackCheckoutStepViewed({
        step: 3,
        checkout_id: cart._id, // eslint-disable-line camelcase
        payment_method: selectedPaymentMethod, // eslint-disable-line camelcase
        shipping_method: selectedShipping // eslint-disable-line camelcase
      });
    }
  };

  const handlePaymentSubmit = (paymentInput) => {
    const selectedPayment = paymentInput?.payment?.method;
    setSelectedPaymentMethod(selectedPayment);

    cartStore.addCheckoutPayment(paymentInput);
    setHasPaymentError(false);
    handleActionAlerts({ 3: {} });

    trackPaymentInfoEntered({
      step: 3,
      checkout_id: cart._id, // eslint-disable-line camelcase
      payment_method: selectedPayment, // eslint-disable-line camelcase
      shipping_method: selectedShippingMethod // eslint-disable-line camelcase
    });

    // The next step will automatically be expanded, so lets track that
    trackCheckoutStepViewed({
      step: 4,
      checkout_id: cart._id, // eslint-disable-line camelcase
      payment_method: selectedPayment, // eslint-disable-line camelcase
      shipping_method: selectedShippingMethod // eslint-disable-line camelcase
    });
  };

  const handlePaymentsReset = () => {
    cartStore.resetCheckoutPayments();
  };

  const buildOrder = async () => {
    const cartId = cartStore.hasAccountCart ? cartStore.accountCartId : cartStore.anonymousCartId;
    const { checkout } = cart;

    const fulfillmentGroups = checkout.fulfillmentGroups.map((group) => {
      const { data } = group;
      const { selectedFulfillmentOption } = group;

      const items = cart.items.map((item) => ({
        addedAt: item.addedAt,
        price: item.price.amount,
        productConfiguration: item.productConfiguration,
        quantity: item.quantity
      }));

      return {
        data,
        items,
        selectedFulfillmentMethodId: selectedFulfillmentOption.fulfillmentMethod._id,
        shopId: group.shop._id,
        totalPrice: checkout.summary.total.amount,
        type: group.type
      };
    });

    const order = {
      cartId,
      currencyCode: checkout.summary.total.currency.code,
      email: orderEmailAddress,
      fulfillmentGroups,
      shopId: cart.shop._id
    };

    setIsPlacingOrder(true);
    placeOrder(order);
  };

  const placeOrder = async (order) => {
    const { apolloClient } = props;

    // Payments can have `null` amount to mean "remaining".
    let remainingAmountDue = order.fulfillmentGroups.reduce((sum, group) => sum + group.totalPrice, 0);
    const payments = cartStore.checkoutPayments.map(({ payment }) => {
      const amount = payment.amount ? Math.min(payment.amount, remainingAmountDue) : remainingAmountDue;
      remainingAmountDue -= amount;
      return { ...payment, amount };
    });

    try {
      const { data } = await apolloClient.mutate({
        mutation: placeOrderMutation,
        variables: {
          input: {
            order,
            payments
          }
        }
      });

      // Placing the order was successful, so we should clear the
      // anonymous cart credentials from cookie since it will be
      // deleted on the server.
      cartStore.clearAnonymousCartCredentials();
      clearAuthenticatedUsersCart();

      // Also destroy the collected and cached payment input
      cartStore.resetCheckoutPayments();

      const { placeOrder: { orders, token } } = data;

      trackCheckoutStepCompleted({
        step: 4,
        checkout_id: cart._id, // eslint-disable-line camelcase
        payment_method: selectedPaymentMethod, // eslint-disable-line camelcase
        shipping_method: selectedShippingMethod // eslint-disable-line camelcase
      });

      trackOrderCompleted({ orders });

      // Send user to order confirmation page
      Router.push(`/checkout/order?orderId=${orders[0]?.referenceId}${token ? `&token=${token}` : ""}`);
    } catch (error) {
      setHasPaymentError(true);
      setIsPlacingOrder(false);
      handleActionAlerts({
        3: {
          alertType: "error",
          title: "Payment method failed",
          message: error.toString().replace("Error: GraphQL error:", "")
        }
      });
    }
  };

  const renderPlacingOrderOverlay = () => (
    <Dialog fullScreen disableBackdropClick={true} disableEscapeKeyDown={true} open={isPlacingOrder}>
      <PageLoading delay={0} message="Placing your order..." />
    </Dialog>
  );

  const [fulfillmentGroup] = fulfillmentGroups;

  // Order summary
  const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = summary;
  const checkoutSummary = {
    displayShipping: fulfillmentTotal && fulfillmentTotal.displayAmount,
    displaySubtotal: itemTotal.displayAmount,
    displaySurcharge: surchargeTotal.displayAmount,
    displayTotal: total.displayAmount,
    displayTax: taxTotal && taxTotal.displayAmount,
    items
  };

  const addresses = fulfillmentGroups.reduce((list, group) => {
    if (group.shippingAddress) list.push(group.shippingAddress);
    return list;
  }, []);

  const payments = cartStore.checkoutPayments.slice();
  const remainingAmountDue = calculateRemainderDue(payments, total.amount);

  let PaymentComponent = PaymentsCheckoutAction;
  if (!Array.isArray(paymentMethods) || paymentMethods.length === 0) {
    PaymentComponent = NoPaymentMethodsMessage;
  }

  const actions = [
    {
      id: "1",
      activeLabel: "Enter a shipping address",
      completeLabel: "Shipping address",
      incompleteLabel: "Shipping address",
      status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
      component: ShippingAddressCheckoutAction,
      onSubmit: setShippingAddress,
      props: {
        addressValidationResults,
        alert: actionAlerts["1"],
        fulfillmentGroup,
        onAddressValidation: addressValidation
      }
    },
    {
      id: "2",
      activeLabel: "Choose a shipping method",
      completeLabel: "Shipping method",
      incompleteLabel: "Shipping method",
      status: fulfillmentGroup.selectedFulfillmentOption ? "complete" : "incomplete",
      component: FulfillmentOptionsCheckoutAction,
      onSubmit: setShippingMethod,
      props: {
        alert: actionAlerts["2"],
        fulfillmentGroup
      }
    },
    {
      id: "3",
      activeLabel: "Enter payment information",
      completeLabel: "Payment information",
      incompleteLabel: "Payment information",
      status: remainingAmountDue === 0 && !hasPaymentError ? "complete" : "incomplete",
      component: PaymentComponent,
      onSubmit: handlePaymentSubmit,
      props: {
        addresses,
        alert: actionAlerts["3"],
        onReset: handlePaymentsReset,
        payments,
        paymentMethods,
        remainingAmountDue
      }
    },
    {
      id: "4",
      activeLabel: "Review and place order",
      completeLabel: "Review and place order",
      incompleteLabel: "Review and place order",
      status: "incomplete",
      component: FinalReviewCheckoutAction,
      onSubmit: buildOrder,
      props: {
        alert: actionAlerts["4"],
        checkoutSummary,
        productURLPath: "/api/detectLanguage/product/"
      }
    }
  ];

  return (
    <Fragment>
      {renderPlacingOrderOverlay()}
      <Actions actions={actions} />
    </Fragment>
  );
};


CheckoutActions.propTypes = {
  apolloClient: PropTypes.shape({
    mutate: PropTypes.func.isRequired
  }),
  cart: PropTypes.shape({
    account: PropTypes.object,
    checkout: PropTypes.object,
    email: PropTypes.string,
    items: PropTypes.array
  }).isRequired,
  cartStore: PropTypes.object,
  checkoutMutations: PropTypes.shape({
    onSetFulfillmentOption: PropTypes.func.isRequired,
    onSetShippingAddress: PropTypes.func.isRequired
  }),
  clearAuthenticatedUsersCart: PropTypes.func.isRequired,
  orderEmailAddress: PropTypes.string.isRequired,
  paymentMethods: PropTypes.array
};

export default CheckoutActions;

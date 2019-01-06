import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import isEqual from "lodash.isequal";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import StripePaymentCheckoutAction from "components/StripePaymentCheckoutAction";
import FinalReviewCheckoutAction from "@reactioncommerce/components/FinalReviewCheckoutAction/v1";
import withCart from "containers/cart/withCart";
import withAddressValidation from "containers/address/withAddressValidation";
import Dialog from "@material-ui/core/Dialog";
import PageLoading from "components/PageLoading";
import { Router } from "routes";
import track from "lib/tracking/track";
import TRACKING from "lib/tracking/constants";
import trackCheckout from "lib/tracking/trackCheckout";
import trackOrder from "lib/tracking/trackOrder";
import trackCheckoutStep from "lib/tracking/trackCheckoutStep";
import { isShippingAddressSet } from "lib/utils/cartUtils";
import { placeOrder } from "../../containers/order/mutations.gql";

const {
  CHECKOUT_STARTED,
  CHECKOUT_STEP_COMPLETED,
  CHECKOUT_STEP_VIEWED,
  ORDER_COMPLETED,
  PAYMENT_INFO_ENTERED
} = TRACKING;

@withAddressValidation
@withCart
@track()
@observer
export default class CheckoutActions extends Component {
  static propTypes = {
    addressValidation: PropTypes.func.isRequired,
    addressValidationResults: PropTypes.object,
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }),
    cartStore: PropTypes.shape({
      checkoutPaymentInputData: PropTypes.object,
      setCheckoutPaymentInputData: PropTypes.func
    }),
    checkoutMutations: PropTypes.shape({
      onSetFulfillmentOption: PropTypes.func.isRequired,
      onSetShippingAddress: PropTypes.func.isRequired
    }),
    orderEmailAddress: PropTypes.string.isRequired
  };

  state = {
    actionAlerts: {
      1: null,
      2: null,
      3: null,
      4: null
    },
    hasPaymentError: false,
    isPlacingOrder: false
  };

  componentDidMount() {
    this._isMounted = true;
    const { cart } = this.props;
    // Track start of checkout process
    this.trackCheckoutStarted({ cart, action: CHECKOUT_STARTED });

    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const hasShippingAddress = isShippingAddressSet(fulfillmentGroups);
    // Track the first step, "Enter a shipping address" when the page renders,
    // as it will be expanded by default, only record this event when the
    // shipping address has not yet been set.
    if (!hasShippingAddress) {
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_VIEWED, step: 1 }));
    }
  }

  componentDidUpdate({ addressValidationResults: prevAddressValidationResults }) {
    const { addressValidationResults } = this.props;
    if (
      addressValidationResults &&
      prevAddressValidationResults &&
      !isEqual(addressValidationResults, prevAddressValidationResults)
    ) {
      this.handleValidationErrors();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  @trackCheckoutStep()
  trackAction() {}

  @trackCheckout()
  trackCheckoutStarted() {}

  @trackOrder()
  trackOrder() {}

  buildData = ({ step, action }) => ({
    action,
    payment_method: this.paymentMethod, // eslint-disable-line camelcase
    shipping_method: this.shippingMethod, // eslint-disable-line camelcase
    step
  });

  get shippingMethod() {
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const { selectedFulfillmentOption } = fulfillmentGroups[0];
    return selectedFulfillmentOption ? selectedFulfillmentOption.fulfillmentMethod.displayName : null;
  }

  get paymentMethod() {
    const { checkoutPaymentInputData } = this.props.cartStore;
    return checkoutPaymentInputData ? checkoutPaymentInputData.payment.method : null;
  }

  setShippingAddress = async (address) => {
    const { checkoutMutations: { onSetShippingAddress } } = this.props;
    delete address.isValid;
    const { data, error } = await onSetShippingAddress(address);

    if (data && !error) {
      // track successfully setting a shipping address
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_COMPLETED, step: 1 }));

      // The next step will automatically be expanded, so lets track that
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_VIEWED, step: 2 }));

      if (this._isMounted) {
        this.setState({
          actionAlerts: {
            1: {}
          }
        });
      }
    }
  };

  handleValidationErrors() {
    const { addressValidationResults } = this.props;
    const { validationErrors } = addressValidationResults || [];
    const shippingAlert =
      validationErrors && validationErrors.length ? {
        alertType: validationErrors[0].type,
        title: validationErrors[0].summary,
        message: validationErrors[0].details
      } : null;
    this.setState({ actionAlerts: { 1: shippingAlert } });
  }

  setShippingMethod = async (shippingMethod) => {
    const { checkoutMutations: { onSetFulfillmentOption } } = this.props;
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const fulfillmentOption = {
      fulfillmentGroupId: fulfillmentGroups[0]._id,
      fulfillmentMethodId: shippingMethod.selectedFulfillmentOption.fulfillmentMethod._id
    };

    const { data, error } = await onSetFulfillmentOption(fulfillmentOption);
    if (data && !error) {
      // track successfully setting a shipping method
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_COMPLETED, step: 2 }));

      // The next step will automatically be expanded, so lets track that
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_VIEWED, step: 3 }));
    }
  };

  setPaymentMethod = (paymentInputData) => {
    this.props.cartStore.setCheckoutPaymentInputData(paymentInputData);

    this.setState({
      hasPaymentError: false,
      actionAlerts: {
        3: {}
      }
    });

    // Track successfully setting a payment method
    this.trackAction(this.buildData({ action: PAYMENT_INFO_ENTERED, step: 3 }));

    // The next step will automatically be expanded, so lets track that
    this.trackAction(this.buildData({ action: CHECKOUT_STEP_VIEWED, step: 4 }));
  };

  buildOrder = async () => {
    const { cart, cartStore, orderEmailAddress } = this.props;
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
      currencyCode: cart.currencyCode,
      email: orderEmailAddress,
      fulfillmentGroups,
      shopId: cart.shop._id
    };

    return this.setState({ isPlacingOrder: true }, () => this.placeOrder(order));
  };

  placeOrder = async (order) => {
    const { cartStore, client: apolloClient } = this.props;
    const { payment } = cartStore.checkoutPaymentInputData || {};

    try {
      const amount = order.fulfillmentGroups.reduce((sum, group) => sum + group.totalPrice, 0);
      const { data } = await apolloClient.mutate({
        mutation: placeOrder,
        variables: {
          input: {
            order,
            payments: [{ ...payment, amount }]
          }
        }
      });

      // Placing the order was successful, so we should clear the
      // anonymous cart credentials from cookie since it will be
      // deleted on the server.
      cartStore.clearAnonymousCartCredentials();

      // Also destroy the collected and cached payment input
      cartStore.setCheckoutPaymentInputData(null);

      const { placeOrder: { orders, token } } = data;

      this.trackAction(this.buildData({ action: CHECKOUT_STEP_COMPLETED, step: 4 }));

      this.trackOrder({ action: ORDER_COMPLETED, orders });

      // Send user to order confirmation page
      Router.pushRoute("checkoutComplete", { orderId: orders[0].referenceId, token });
    } catch (error) {
      if (this._isMounted) {
        this.setState({
          hasPaymentError: true,
          isPlacingOrder: false,
          actionAlerts: {
            3: {
              alertType: "error",
              title: "Payment method failed",
              message: error.toString().replace("Error: GraphQL error:", "")
            }
          }
        });
      }
    }
  };

  renderPlacingOrderOverlay = () => {
    const { isPlacingOrder } = this.state;

    return (
      <Dialog fullScreen disableBackdropClick={true} disableEscapeKeyDown={true} open={isPlacingOrder}>
        <PageLoading delay={0} message="Placing your order..." />
      </Dialog>
    );
  };

  render() {
    const { addressValidation, addressValidationResults, cart, cartStore } = this.props;
    if (!cart) return null;

    const { checkout: { fulfillmentGroups, summary }, items } = cart;
    const { actionAlerts, hasPaymentError } = this.state;
    const shippingAddressSet = isShippingAddressSet(fulfillmentGroups);
    const fulfillmentGroup = fulfillmentGroups[0];

    let shippingAddress = { data: { shippingAddress: null } };

    if (shippingAddressSet) {
      shippingAddress = {
        data: {
          shippingAddress: fulfillmentGroup.data.shippingAddress
        }
      };
    }

    const paymentData = cartStore.checkoutPaymentInputData;

    // Order summary
    const { fulfillmentTotal, itemTotal, taxTotal, total } = summary;
    const checkoutSummary = {
      displayShipping: fulfillmentTotal && fulfillmentTotal.displayAmount,
      displaySubtotal: itemTotal.displayAmount,
      displayTotal: total.displayAmount,
      displayTax: taxTotal && taxTotal.displayAmount,
      items
    };

    const actions = [
      {
        id: "1",
        activeLabel: "Enter a shipping address",
        completeLabel: "Shipping address",
        incompleteLabel: "Shipping address",
        status: shippingAddressSet ? "complete" : "incomplete",
        component: ShippingAddressCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          addressValidationResults,
          alert: actionAlerts["1"],
          fulfillmentGroup: shippingAddress,
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
        onSubmit: this.setShippingMethod,
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
        status: paymentData && !hasPaymentError ? "complete" : "incomplete",
        component: StripePaymentCheckoutAction,
        onSubmit: this.setPaymentMethod,
        props: {
          alert: actionAlerts["3"],
          paymentData
        }
      },
      {
        id: "4",
        activeLabel: "Review and place order",
        completeLabel: "Review and place order",
        incompleteLabel: "Review and place order",
        status: "incomplete",
        component: FinalReviewCheckoutAction,
        onSubmit: this.buildOrder,
        props: {
          alert: actionAlerts["4"],
          checkoutSummary,
          productURLPath: "/product/"
        }
      }
    ];

    return (
      <Fragment>
        {this.renderPlacingOrderOverlay()}
        <Actions actions={actions} />
      </Fragment>
    );
  }
}

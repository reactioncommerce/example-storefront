import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import StripePaymentCheckoutAction from "@reactioncommerce/components/StripePaymentCheckoutAction/v1";
import FinalReviewCheckoutAction from "@reactioncommerce/components/FinalReviewCheckoutAction/v1";
import withCart from "containers/cart/withCart";
import withPlaceStripeOrder from "containers/order/withPlaceStripeOrder";
import withAddressValidation from "containers/address/withAddressValidation";
import Dialog from "@material-ui/core/Dialog";
import PageLoading from "components/PageLoading";
import { Router } from "routes";
import track from "lib/tracking/track";
import TRACKING from "lib/tracking/constants";
import trackCheckout from "lib/tracking/trackCheckout";
import trackOrder from "lib/tracking/trackOrder";
import trackCheckoutStep from "lib/tracking/trackCheckoutStep";
import { decodeOpaqueId } from "lib/utils/decoding";
import { isShippingAddressSet } from "lib/utils/cartUtils";

const {
  CHECKOUT_STARTED,
  CHECKOUT_STEP_COMPLETED,
  CHECKOUT_STEP_VIEWED,
  ORDER_COMPLETED,
  PAYMENT_INFO_ENTERED
} = TRACKING;

@withAddressValidation
@withCart
@withPlaceStripeOrder
@inject("authStore")
@track()
@observer
export default class CheckoutActions extends Component {
  static propTypes = {
    addressValidation: PropTypes.func.isRequired,
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }),
    cartStore: PropTypes.shape({
      stripeToken: PropTypes.object
    }),
    checkoutMutations: PropTypes.shape({
      // onUpdateFulfillmentOptionsForGroup: PropTypes.func.isRequired,
      onSetFulfillmentOption: PropTypes.func.isRequired,
      onSetShippingAddress: PropTypes.func.isRequired
    }),
    placeOrderWithStripeCard: PropTypes.func.isRequired
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

  @trackCheckoutStep()
  trackAction() {}

  @trackCheckout()
  trackCheckoutStarted() {}

  @trackOrder()
  trackOrder() {}

  buildData = (data) => {
    const { step, shipping_method = null, payment_method = null, action } = data; // eslint-disable-line camelcase

    return {
      action,
      payment_method, // eslint-disable-line camelcase
      shipping_method, // eslint-disable-line camelcase
      step
    };
  };

  get shippingMethod() {
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const shippingMethod = fulfillmentGroups[0].selectedFulfillmentOption.fulfillmentMethod.displayName;

    return shippingMethod;
  }

  get paymentMethod() {
    const { stripeToken: { token: { card } } } = this.props.cartStore;
    return card.brand;
  }

  setShippingAddress = async (address) => {
    const { checkoutMutations: { onSetShippingAddress } } = this.props;
    const { data, error } = await onSetShippingAddress(address);

    if (data && !error) {
      // track successfully setting a shipping address
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_COMPLETED, step: 1 }));

      // The next step will automatically be expanded, so lets track that
      this.trackAction(this.buildData({ action: CHECKOUT_STEP_VIEWED, step: 2 }));
    }
  };

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
      this.trackAction({
        step: 2,
        shipping_method: this.shippingMethod, // eslint-disable-line camelcase
        payment_method: null, // eslint-disable-line camelcase
        action: CHECKOUT_STEP_COMPLETED
      });

      // The next step will automatically be expanded, so lets track that
      this.trackAction({
        step: 3,
        shipping_method: this.shippingMethod, // eslint-disable-line camelcase
        payment_method: null, // eslint-disable-line camelcase
        action: CHECKOUT_STEP_VIEWED
      });
    }
  };

  setPaymentMethod = (stripeToken) => {
    const { cartStore } = this.props;

    // Store stripe token in MobX store
    cartStore.setStripeToken(stripeToken);

    this.setState({
      hasPaymentError: false,
      actionAlerts: {
        3: {}
      }
    });

    // Track successfully setting a payment method
    this.trackAction({
      step: 3,
      shipping_method: this.shippingMethod, // eslint-disable-line camelcase
      payment_method: this.paymentMethod, // eslint-disable-line camelcase
      action: PAYMENT_INFO_ENTERED
    });

    // The next step will automatically be expanded, so lets track that
    this.trackAction({
      step: 4,
      shipping_method: this.shippingMethod, // eslint-disable-line camelcase
      payment_method: this.paymentMethod, // eslint-disable-line camelcase
      action: CHECKOUT_STEP_VIEWED
    });
  };

  buildOrder = async () => {
    const { cart, cartStore } = this.props;
    const cartId = cartStore.hasAccountCart ? cartStore.accountCartId : cartStore.anonymousCartId;
    const { checkout, email, shop } = cart;
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
        shopId: shop._id,
        totalPrice: checkout.summary.total.amount,
        type: group.type
      };
    });

    const order = {
      cartId,
      currencyCode: shop.currency.code,
      email,
      fulfillmentGroups,
      shopId: shop._id
    };

    return this.setState({ isPlacingOrder: true }, () => this.placeOrder(order));
  };

  placeOrder = async (order) => {
    const { authStore, cartStore, placeOrderWithStripeCard } = this.props;

    try {
      const { data } = await placeOrderWithStripeCard(order);
      const { placeOrderWithStripeCardPayment: { orders, token } } = data;

      this.trackAction({
        step: 4,
        shipping_method: this.shippingMethod, // eslint-disable-line camelcase
        payment_method: this.paymentMethod, // eslint-disable-line camelcase
        action: CHECKOUT_STEP_COMPLETED
      });

      // Clear anonymous cart
      if (!authStore.isAuthenticated) {
        cartStore.clearAnonymousCartCredentials();
      }

      this.trackOrder({ action: ORDER_COMPLETED, orders });
      // Send user to order confirmation page
      const { id } = decodeOpaqueId(orders[0]._id);
      Router.pushRoute("checkoutComplete", { orderId: id, token });
    } catch (error) {
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
    if (!this.props.cart) {
      return null;
    }

    const { addressValidation, addressValidationResults, cartStore: { stripeToken } } = this.props;
    const { checkout: { fulfillmentGroups, summary }, items } = this.props.cart;
    const { actionAlerts, hasPaymentError } = this.state;
    const shippingAddressSet = isShippingAddressSet(fulfillmentGroups);
    const fulfillmentGroup = fulfillmentGroups[0];

    let shippingAddress = { data: { shippingAddress: null } };
    // Adapt shipping address to match fields in the AddressForm component.
    // fullName is split into firstName and lastName
    if (shippingAddressSet) {
      shippingAddress = {
        data: {
          shippingAddress: fulfillmentGroup.data.shippingAddress
        }
      };
    }

    let paymentData = null;
    if (stripeToken) {
      const { billingAddress, token: { card } } = stripeToken;
      const displayName = `${card.brand} ending in ${card.last4}`;
      paymentData = {
        data: {
          billingAddress,
          displayName
        }
      };
    }

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
          validation: addressValidation
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
        status: stripeToken && !hasPaymentError ? "complete" : "incomplete",
        component: StripePaymentCheckoutAction,
        onSubmit: this.setPaymentMethod,
        props: {
          alert: actionAlerts["3"],
          payment: paymentData
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

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
import Dialog from "@material-ui/core/Dialog";
import PageLoading from "components/PageLoading";
import { Router } from "routes";
import {
  adaptAddressToFormFields,
  isShippingAddressSet
} from "lib/utils/cartUtils";

@withCart
@withPlaceStripeOrder
@inject("authStore")
@observer
export default class CheckoutActions extends Component {
  static propTypes = {
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
    isPlacingOrder: false
  }

  setShippingAddress = (address) => {
    const { checkoutMutations: { onSetShippingAddress } } = this.props;

    // Omit firstName, lastName props as they are not in AddressInput type
    // The address form and GraphQL endpoint need to be made consistent
    const { firstName, lastName, ...rest } = address;
    return onSetShippingAddress({
      fullName: `${address.firstName} ${address.lastName}`,
      ...rest
    });
  }

  setShippingMethod = (shippingMethod) => {
    const { checkoutMutations: { onSetFulfillmentOption } } = this.props;
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    const fulfillmentOption = {
      fulfillmentGroupId: fulfillmentGroups[0]._id,
      fulfillmentMethodId: shippingMethod.selectedFulfillmentOption.fulfillmentMethod._id
    };

    return onSetFulfillmentOption(fulfillmentOption);
  }

  setPaymentMethod = (stripeToken) => {
    const { cartStore } = this.props;

    // Store stripe token in MobX store
    cartStore.setStripeToken(stripeToken);
  }

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
  }

  placeOrder = async (order) => {
    const { authStore, cartStore, placeOrderWithStripeCard } = this.props;
    const { data, error } = await placeOrderWithStripeCard(order);

    // If success
    if (data && !error) {
      const { placeOrderWithStripeCardPayment: { orders, token } } = data;

      // Clear anonymous cart
      if (!authStore.isAuthenticated) {
        cartStore.clearAnonymousCartCredentials();
      }

      // Send user to order confirmation page
      Router.pushRoute("checkoutComplete", { orderId: orders[0]._id, token });
    }

    // TODO: if an error occurred, notify user
  }

  handleClose = () => {
    // TODO: if an error occurs, then close dialog
  }

  renderPlacingOrderOverlay = () => {
    const { isPlacingOrder } = this.state;

    return (
      <Dialog
        fullScreen
        open={isPlacingOrder}
        onClose={this.handleClose}
      >
        <PageLoading delay={0} message="Placing your order..."/>
      </Dialog>
    );
  }

  render() {
    if (!this.props.cart) {
      return null;
    }

    const { cartStore: { stripeToken } } = this.props;
    const { checkout: { fulfillmentGroups, summary }, items } = this.props.cart;
    const shippingAddressSet = isShippingAddressSet(fulfillmentGroups);
    const fulfillmentGroup = fulfillmentGroups[0];

    let shippingAddress = { data: { shippingAddress: null } };
    // Adapt shipping address to match fields in the AddressForm component.
    // fullName is split into firstName and lastName
    if (shippingAddressSet) {
      shippingAddress = {
        data: {
          shippingAddress: adaptAddressToFormFields(fulfillmentGroup.data.shippingAddress)
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
        label: "Shipping Information",
        status: shippingAddressSet ? "complete" : "incomplete",
        component: ShippingAddressCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          fulfillmentGroup: shippingAddress
        }
      },
      {
        label: "Choose a shipping method",
        status: fulfillmentGroup.selectedFulfillmentOption ? "complete" : "incomplete",
        component: FulfillmentOptionsCheckoutAction,
        onSubmit: this.setShippingMethod,
        props: {
          fulfillmentGroup
        }
      },
      {
        label: "Payment Information",
        status: stripeToken ? "complete" : "incomplete",
        component: StripePaymentCheckoutAction,
        onSubmit: this.setPaymentMethod,
        props: {
          payment: paymentData
        }
      },
      {
        label: "Review and place order",
        status: "incomplete",
        component: FinalReviewCheckoutAction,
        onSubmit: this.buildOrder,
        props: {
          checkoutSummary
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

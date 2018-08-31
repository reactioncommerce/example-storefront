import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import StripePaymentCheckoutAction from "@reactioncommerce/components/StripePaymentCheckoutAction/v1";
import withCart from "containers/cart/withCart";
import { isFulfillmentOptionSet, isPaymentMethodSet } from "lib/utils/cartUtils";

// TODO: remove this mocked payment method
const paymentMethods = [{
  _id: 1,
  name: "reactionstripe",
  data: {
    billingAddress: null,
    displayName: null
  }
}];

@withCart
@observer
export default class CheckoutActions extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }),
    checkout: PropTypes.shape({
      onSetFulfillmentOption: PropTypes.func.isRequired,
      onSetShippingAddress: PropTypes.func.required
    })
  };

  setShippingAddress = async (address) => {
    const { checkout: { onSetShippingAddress } } = this.props;

    // Omit firstName, lastName props as they are not in AddressInput type
    // The address form and GraphQL endpoint need to be made consistent
    const { firstName, lastName, ...rest } = address;
    return onSetShippingAddress({
      fullName: `${address.firstName} ${address.lastName}`,
      ...rest
    });
  }

  setPaymentMethod = (data) => {
    const { billingAddress, token: { card } } = data;
    const payment = {
      billingAddress,
      displayName: `${card.brand} ending in ${card.last4}`
    };

    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve) => {
      setTimeout(() => {
        paymentMethods[0].data = payment;
        // TODO: this.forceUpdate() will be removed once state is tracked by MobX
        this.forceUpdate();
        resolve(payment);
      }, 1000, { payment });
    });
  }

  render() {
    const { checkout: { fulfillmentGroups } } = this.props.cart;
    // console.log("props", this.props);

    const shippingStatus = isFulfillmentOptionSet(fulfillmentGroups) ? "complete" : "incomplete";
    const paymentStatus = isPaymentMethodSet(paymentMethods) ? "complete" : "incomplete";

    const actions = [
      {
        label: "Shipping Information",
        status: shippingStatus,
        component: ShippingAddressCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          fulfillmentGroup: shippingStatus === "complete" ? fulfillmentGroups[0] : null
        }
      },
      {
        label: "Payment Information",
        status: paymentStatus,
        component: StripePaymentCheckoutAction,
        onSubmit: this.setPaymentMethod,
        props: {
          payment: paymentStatus === "complete" ? paymentMethods[0] : null
        }
      }
    ];
    return (
      <Actions actions={actions} />
    );
  }
}

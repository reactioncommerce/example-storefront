import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import StripePaymentCheckoutAction from "@reactioncommerce/components/StripePaymentCheckoutAction/v1";
import withCart from "containers/cart/withCart";
import {
  adaptAddressToFormFields,
  isFulfillmentOptionSet,
  isPaymentMethodSet
} from "lib/utils/cartUtils";

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
    onSetShippingAddress({
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
    const isShippingAddressSet = isFulfillmentOptionSet(fulfillmentGroups);
    const isPaymentSet = isPaymentMethodSet(paymentMethods);
    let fulfillmentGroup = fulfillmentGroups[0];
    if (isShippingAddressSet) {
      fulfillmentGroup = {
        data: {
          shippingAddress: adaptAddressToFormFields(fulfillmentGroup.data.shippingAddress)
        }
      };
    }

    const actions = [
      {
        label: "Shipping Information",
        status: isShippingAddressSet ? "complete" : "incomplete",
        component: ShippingAddressCheckoutAction,
        onSubmit: this.setShippingAddress,
        props: {
          fulfillmentGroup
        }
      },
      {
        label: "Payment Information",
        status: isPaymentSet ? "complete" : "incomplete",
        component: StripePaymentCheckoutAction,
        onSubmit: this.setPaymentMethod,
        props: {
          payment: paymentMethods[0]
        }
      }
    ];
    return (
      <Actions actions={actions} />
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import StripePaymentCheckoutAction from "@reactioncommerce/components/StripePaymentCheckoutAction/v1";
import withCart from "containers/cart/withCart";
import {
  adaptAddressToFormFields,
  isShippingAddressSet,
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
    checkoutMutations: PropTypes.shape({
      // onUpdateFulfillmentOptionsForGroup: PropTypes.func.isRequired,
      onSetFulfillmentOption: PropTypes.func.isRequired,
      onSetShippingAddress: PropTypes.func.required
    })
  };

  setShippingAddress = (address) => {
    const { checkoutMutations: { onSetShippingAddress } } = this.props;

    // Omit firstName, lastName props as they are not in AddressInput type
    // The address form and GraphQL endpoint need to be made consistent
    const { firstName, lastName, ...rest } = address;
    onSetShippingAddress({
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

    onSetFulfillmentOption(fulfillmentOption);
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
    const shippingAddressSet = isShippingAddressSet(fulfillmentGroups);
    const isPaymentSet = isPaymentMethodSet(paymentMethods);
    const fulfillmentGroup = fulfillmentGroups[0];


    let shippingAddress = {
      data: {
        shippingAddress: null
      }
    };

    // Adapt shipping address to match fields in the AddressForm component.
    // fullName is split into firstName and lastName
    if (shippingAddressSet) {
      shippingAddress = {
        data: {
          shippingAddress: adaptAddressToFormFields(fulfillmentGroup.data.shippingAddress)
        }
      };
    }

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

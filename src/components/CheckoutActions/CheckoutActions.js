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
  isShippingAddressSet
} from "lib/utils/cartUtils";

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
    cartStore: PropTypes.shape({
      stripeToken: PropTypes.object
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

  setPaymentMethod = (stripeToken) => {
    const { cartStore } = this.props;

    // Store stripe token in MobX store
    cartStore.setStripeToken(stripeToken);
  }

  render() {
    const { cartStore: { stripeToken } } = this.props;
    const { checkout: { fulfillmentGroups } } = this.props.cart;
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
      }
    ];
    return (
      <Actions actions={actions} />
    );
  }
}

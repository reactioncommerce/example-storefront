import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import StripePaymentCheckoutAction from "@reactioncommerce/components/StripePaymentCheckoutAction/v1";
import FinalReviewCheckoutAction from "@reactioncommerce/components/FinalReviewCheckoutAction/v1";
import withCart from "containers/cart/withCart";
import withPlaceStripeOrder from "containers/order/withPlaceStripeOrder";
import {
  adaptAddressToFormFields,
  isShippingAddressSet
} from "lib/utils/cartUtils";

const checkoutSummary = {
  displayShipping: "$5.25",
  displaySubtotal: "$118.00",
  displayTotal: "$135.58",
  displayTax: "$12.33",
  items: [{
    _id: "123",
    attributes: [{ label: "Color", value: "Red" }, { label: "Size", value: "Medium" }],
    compareAtPrice: {
      displayAmount: "$45.00"
    },
    currentQuantity: 3,
    imageURLs: {
      small: "//placehold.it/150",
      thumbnail: "//placehold.it/100"
    },
    isLowQuantity: true,
    price: {
      displayAmount: "$20.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "A Great Product",
    quantity: 2
  },
  {
    _id: "456",
    attributes: [{ label: "Color", value: "Black" }, { label: "Size", value: "10" }],
    currentQuantity: 500,
    imageURLs: {
      small: "//placehold.it/150",
      thumbnail: "//placehold.it/100"
    },
    isLowQuantity: false,
    price: {
      displayAmount: "$78.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "Another Great Product",
    quantity: 1
  }]
};

@withCart
@withPlaceStripeOrder
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

  placeOrder = () => {
    const { placeOrderWithStripeCard } = this.props;
    // TODO: place order
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
      },
      {
        label: "Review and place order",
        status: "incomplete",
        component: FinalReviewCheckoutAction,
        onSubmit: this.placeOrder,
        props: {
          checkoutSummary
        }
      }
    ];
    return (
      <Actions actions={actions} />
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import { Router } from "routes";
import {
  accountCartByAccountIdQuery,
  anonymousCartByCartIdQuery
} from "../cart/queries.gql";
import { placeOrderWithStripeCardPayment } from "./mutations.gql";

/**
 * withPlaceStripeOrder higher order is used to place an order with a stripe card.
 * @name WithPlaceStripeOrder
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with placeOrderWithStripeCard callback in props
 */
export default (Component) => (
  @withApollo
  @inject("authStore", "cartStore", "routingStore")
  @observer
  class WithPlaceStripeOrder extends React.Component {
    static propTypes = {
      authStore: PropTypes.shape({
        accountId: PropTypes.string,
        token: PropTypes.string,
        isAuthenticated: PropTypes.bool
      }),
      cartStore: PropTypes.shape({
        stripeToken: PropTypes.object
      }),
      client: PropTypes.shape({
        mutate: PropTypes.func.isRequired
      })
    }

    handlePlaceOrderWithStripeCard = async (order) => {
      const { authStore, cartStore, client: apolloClient } = this.props;
      const { fulfillmentGroups } = order;
      const { stripeToken: { billingAddress } } = cartStore;

      const accountOrder = Object.assign({}, order);
      if (authStore.account.emailRecords) {
        const { account: { emailRecords } } = authStore;
        if (Array.isArray(emailRecords.slice())) {
          accountOrder.email = emailRecords[0].address;
        }
        // TODO: throw error, complain
      }

      const payment = {
        // If the users provided a billing address use it, otherwise, use the shipping address
        billingAddress: billingAddress || fulfillmentGroups[0].data.shippingAddress,
        stripeTokenId: cartStore.stripeToken.token.id
      };

      const { data, error } = await apolloClient.mutate({
        mutation: placeOrderWithStripeCardPayment,
        variables: {
          input: {
            order: accountOrder,
            payment
          }
        },
        update: (cache) => {
          // TODO: revisit and verify this actually clears the apollo cache
          cache.writeQuery({
            query: accountCartByAccountIdQuery,
            data: { cart: null }
          });

          cache.writeQuery({
            query: anonymousCartByCartIdQuery,
            data: { cart: null }
          });
        }
      });

      // If success
      if (data && !error) {
        const { placeOrderWithStripeCardPayment: { orders, token } } = data;

        // Clear anonymous cart
        cartStore.clearAnonymousCartCredentials();

        // Send user to order confirmation page
        Router.pushRoute("checkoutComplete", { orderId: orders[0]._id, token });
      }

      // TODO: if an error occurred, notify user
    }

    render() {
      return (
        <Component
          {...this.props}
          placeOrderWithStripeCard={this.handlePlaceOrderWithStripeCard}
        />
      );
    }
  }
);

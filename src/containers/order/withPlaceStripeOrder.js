import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import { placeOrderWithStripeCardPayment } from "./mutations.gql";

/**
 * withPlaceStripeOrder higher order is used to place an order with a stripe card.
 * @name WithPlaceStripeOrder
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with placeOrderWithStripeCard callback in props
 */
export default (Component) => (
  @withApollo
  @inject("cartStore", "routingStore")
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
      }),
      primaryShopId: PropTypes.string.isRequired
    }

    handlePlaceOrderWithStripeCard = async (userOrder) => {
      const { cartStore: { stripeToken }, client: apolloClient } = this.props;
      const payment = {
        billingAddress: stripeToken.billingAddress,
        stripeTokenId: stripeToken.id
      };

      const result = await apolloClient.mutate({
        mutation: placeOrderWithStripeCardPayment,
        variables: {
          input: {
            order: userOrder,
            payment
          }
        }
      });

      // TODO: Check result to ensure success

      // TODO: route user to order complete page.
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

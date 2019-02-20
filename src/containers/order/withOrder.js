import React from "react";
import PropTypes from "prop-types";
import { Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { orderByReferenceId } from "./queries.gql";

/**
 * withOrder higher order query component for fetching an order
 * @name WithOrder
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default function withOrder(Component) {
  @withApollo
  @inject("cartStore", "primaryShopId", "routingStore", "uiStore")
  @observer
  class WithOrder extends React.Component {
    static propTypes = {
      cartStore: PropTypes.shape({
        anonymousCartId: PropTypes.string,
        anonymousCartToken: PropTypes.string,
        setAnonymousCartCredentialsFromLocalStorage: PropTypes.func
      }),
      client: PropTypes.shape({
        mutate: PropTypes.func.isRequired
      }),
      primaryShopId: PropTypes.string.isRequired,
      routingStore: PropTypes.shape({
        query: PropTypes.shape({
          orderId: PropTypes.string.isRequired,
          token: PropTypes.string
        })
      }),
      uiStore: PropTypes.shape({
        language: PropTypes.string.isRequired
      })
    }

    render() {
      const { primaryShopId, routingStore, uiStore } = this.props;

      const variables = {
        id: routingStore.query.orderId,
        language: uiStore.language,
        shopId: primaryShopId,
        token: routingStore.query.token || null
      };

      return (
        <Query errorPolicy="all" query={orderByReferenceId} variables={variables}>
          {({ loading: isLoading, data: orderData }) => {
            const { order } = orderData || {};

            return (
              <Component
                {...this.props}
                isLoadingOrder={isLoading}
                order={order}
              />
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithOrder, Component);

  return WithOrder;
}

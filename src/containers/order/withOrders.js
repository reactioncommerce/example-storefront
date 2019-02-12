import React from "react";
import PropTypes from "prop-types";
import { Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";
import withShop from "containers/shop/withShop";
import { ordersByAccountId } from "./queries.gql";

/**
 * withOrders higher order query component for fetching multple orders by accountId
 * @name WithOrders
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `orders` props and callbacks
 */
export default function withOrders(Component) {
  @withApollo
  @withShop
  @inject("authStore", "cartStore", "routingStore")
  @observer
  class WithOrders extends React.Component {
    static propTypes = {
      authStore: PropTypes.shape({
        accountId: PropTypes.string
      }),
      client: PropTypes.shape({
        mutate: PropTypes.func.isRequired
      }),
      primaryShopId: PropTypes.string.isRequired,
      shop: PropTypes.shape({
        _id: PropTypes.string
      }).isRequired
    }

    render() {
      const { authStore, shop: { _id: shopId } } = this.props;

      const variables = {
        accountId: authStore.accountId,
        shopIds: [shopId]
      };

      return (
        <Query errorPolicy="all" query={ordersByAccountId} variables={variables}>
          {({ loading: isLoading, data: orderData }) => {
            const { orders } = orderData || {};

            return (
              <Component
                {...this.props}
                isLoadingOrder={isLoading}
                orders={orders}
              />
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithOrders, Component);

  return WithOrders;
}

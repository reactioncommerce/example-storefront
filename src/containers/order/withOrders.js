import React from "react";
import PropTypes from "prop-types";
import { Query, withApollo } from "react-apollo";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { pagination, paginationVariablesFromUrlParams } from "lib/utils/pagination";
import { ordersByAccountIdQuery } from "./queries.gql";

/**
 * withOrders higher order query component for fetching multple orders by accountId
 * @name WithOrders
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `orders` props and callbacks
 */
export default function withOrders(Component) {
  @withApollo
  @inject("authStore", "cartStore", "primaryShopId", "routingStore", "uiStore")
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
      routingStore: PropTypes.object.isRequired,
      uiStore: PropTypes.shape({
        language: PropTypes.string.isRequired,
        orderQueryLimit: PropTypes.number,
        orderStatusQuery: PropTypes.object
      })
    }

    render() {
      const { authStore, primaryShopId, routingStore, uiStore } = this.props;

      const variables = {
        accountId: authStore.accountId,
        language: uiStore.language,
        orderStatus: toJS(uiStore.orderStatusQuery),
        shopIds: [primaryShopId],
        ...paginationVariablesFromUrlParams(routingStore.query, { defaultPageLimit: uiStore.orderQueryLimit })
      };

      return (
        <Query errorPolicy="all" query={ordersByAccountIdQuery} variables={variables}>
          {({ data, fetchMore, loading: isLoading }) => {
            const { orders } = data || {};

            return (
              <Component
                {...this.props}
                isLoadingOrders={isLoading}
                orders={orders}
                ordersPageInfo={pagination({
                  fetchMore,
                  routingStore,
                  data,
                  queryName: "orders",
                  limit: uiStore.orderQueryLimit
                })}
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

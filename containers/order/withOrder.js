import React from "react";
import PropTypes from "prop-types";
import { Query } from "@apollo/react-components";
import inject from "hocs/inject";
import hoistNonReactStatic from "hoist-non-react-statics";
import { orderByReferenceId } from "./queries.gql";
import { useRouter } from "next/router";

/**
 * withOrder higher order query component for fetching an order
 * @name WithOrder
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default function withOrder(Component) {
  function WithOrder(props) {
    const { primaryShopId, routingStore, uiStore } = props;
    const { query } = useRouter();

    const variables = {
      id: query.orderId,
      language: uiStore.language,
      shopId: primaryShopId,
      token: query.token || null
    };

    return (
      <Query errorPolicy="all" query={orderByReferenceId} variables={variables}>
        {({ loading: isLoading, data: orderData }) => {
          const { order } = orderData || {};

          return (
            <Component
              {...props}
              isLoadingOrder={isLoading}
              order={order}
            />
          );
        }}
      </Query>
    );
  }

  hoistNonReactStatic(WithOrder, Component);

  return inject("cartStore", "primaryShopId", "routingStore", "uiStore")(WithOrder);
}

import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import useOrders from "hooks/orders/useOrders";

/**
 * withOrders higher order query component for fetching multple orders by accountId
 * @name WithOrders
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `orders` props and callbacks
 */
export default function withOrders(Component) {
  function WithOrders(props) { // eslint-disable-line require-jsdoc
    const [orders, isLoading, pagination] = useOrders();

    return (
      <Component
        {...props}
        isLoadingOrders={isLoading}
        orders={orders}
        ordersPageInfo={pagination}
      />
    );
  }

  hoistNonReactStatic(WithOrders, Component);

  return WithOrders;
}

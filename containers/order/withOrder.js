import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import useOrder from "../../hooks/orders/useOrder";

/**
 * withOrder higher order query component for fetching an order
 * @name WithOrder
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default function withOrder(Component) {
  function WithOrder(props) { // eslint-disable-line require-jsdoc
    const [order, isLoading] = useOrder();

    return (
      <Component
        {...props}
        isLoadingOrder={isLoading}
        order={order}
      />
    );
  }

  hoistNonReactStatic(WithOrder, Component);

  return WithOrder;
}

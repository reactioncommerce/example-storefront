import React from "react";
import { Provider } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";

/**
 * withShop higher order query component for fetching primaryShopId and shop data
 * @name withShop
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and shop as props
 */
export default function withShop(Component) {
  class Shop extends React.Component {

    render() {
      const { shop } = this.props;

      return (
        <Provider primaryShopId={shop && shop._id} shop={shop}>
          <Component
            isLoadingShop={false}
            {...this.props}
          />
        </Provider>
      );
    }
  }

  hoistNonReactStatic(Shop, Component);

  return Shop;
}

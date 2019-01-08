import React from "react";
import { Query } from "react-apollo";
import { Provider } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";
import primaryShopQuery from "../common-gql/primaryShop.gql";

/**
 * withShop higher order query component for fetching primaryShopId and shop data
 * @name withShop
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and shop as props
 */
export default function withShop(Component) {
  class Shop extends React.Component {
    render() {
      return (
        <Query errorPolicy="all" query={primaryShopQuery} variables={{ language: "en" }}>
          {({ loading, data: shopData }) => {
            const { primaryShop: shop } = shopData || {};

            // Use mobx-provider to pass shop data through context
            // as well as passing into the component directly
            return (
              <Provider primaryShopId={shop._id} shop={shop}>
                <Component
                  isLoadingShop={loading}
                  shop={shop}
                  {...this.props}
                />
              </Provider>
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(Shop, Component);

  return Shop;
}

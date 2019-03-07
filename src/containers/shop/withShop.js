import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { inject, Provider } from "mobx-react";
import hoistNonReactStatic from "hoist-non-react-statics";
import primaryShopQuery from "../common-gql/primaryShop.gql";

/**
 * withShop higher order query component for fetching primaryShopId and shop data
 * @name withShop
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and shop as props
 */
export default function withShop(Component) {
  @inject("uiStore")
  class Shop extends React.Component {
    static propTypes = {
      uiStore: PropTypes.object.isRequired
    };

    render() {
      const { uiStore } = this.props;
      const { language } = uiStore;

      return (
        <Query errorPolicy="all" query={primaryShopQuery} variables={{ language }}>
          {({ loading, data: shopData }) => {
            const { primaryShop: shop } = shopData || {};

            // Use mobx-provider to pass shop data through context
            // as well as passing into the component directly
            return (
              <Provider primaryShopId={shop && shop._id} shop={shop}>
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

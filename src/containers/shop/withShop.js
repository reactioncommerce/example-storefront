import React from "react";
import { Query } from "react-apollo";
import { Provider } from "mobx-react";
import primaryShopIdQuery from "../common-gql/primaryShopId.gql";
import shopQuery from "./shop.gql";

/**
 * withShop higher order query component for fetching primaryShopId and shop data
 * @name withShop
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and shop as props
 */
export default (Component) => (
  class Shop extends React.Component {
    render() {
      return (
        <Query query={primaryShopIdQuery}>
          {({ loading: loadingPrimaryShopId, data }) => {
            const { primaryShopId } = data || {};

            return (
              <Query query={shopQuery} variables={{ shopId: primaryShopId }} skip={loadingPrimaryShopId}>
                {({ loading: loadingShopData, data: shopData }) => {
                  const { shop } = shopData || {};

                  // Use mobx-provider to pass shop data through context
                  // as well as passing into the component directly
                  return (
                    <Provider primaryShopId={primaryShopId} shop={shop}>
                      <Component
                        {...this.props}
                        isLoading={loadingPrimaryShopId || loadingShopData}
                        primaryShopId={primaryShopId}
                        shop={shop}
                      />
                    </Provider>
                  );
                }}
              </Query>
            );
          }}
        </Query>
      );
    }
  }
);

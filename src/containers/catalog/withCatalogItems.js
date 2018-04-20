import React from "react";
import { Query } from "react-apollo";
import { Provider } from "mobx-react";
import primaryShopIdQuery from "../common-gql/primaryShopId.gql";
import catalogItemsQuery from "./catalogItems.gql";

/**
 * withCatalogItems higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItems
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default (Component) => (
  class CatalogItems extends React.Component {
    render() {
      return (
        <Query query={primaryShopIdQuery}>
          {({ loading, data }) => {
            if (loading) return null;

            const { primaryShopId } = data || {};

            return (
              <Query query={catalogItemsQuery} variables={{ shopId: primaryShopId, first: 25 }}>
                {({ loading: loadingShopData, data: catalogData }) => {
                  if (loadingShopData) return null;

                  const { catalogItems } = catalogData || {};

                  return (
                    <Provider>
                      <Component catalogItems={catalogItems.edges} />
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

import React from "react";
import { inject, observer } from "mobx-react";
import { Query } from "react-apollo";
import catalogItemsQuery from "./catalogItems.gql";

/**
 * withCatalogItems higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItems
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default (Component) => (
  @inject("primaryShopId")
  @observer
  class CatalogItems extends React.Component {
    render() {
      const { primaryShopId } = this.props || {};

      return (
        <Query query={catalogItemsQuery} variables={{ shopId: primaryShopId, first: 25 }}>
          {
            ({ loading: loadingShopData, data: catalogData }) => {

              const { catalogItems } = catalogData || {};

              return (
                <Component {...this.props} catalogItems={catalogItems.edges} />
              );
            }
          }
        </Query>
      );
    }
  }
);

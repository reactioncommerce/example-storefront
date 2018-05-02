import React from "react";
import { inject, observer } from "mobx-react";
import { Query } from "react-apollo";
import { paganation } from "lib/helpers/paganation";
import catalogItemsQuery from "./catalogItems.gql";

const PAGE_LIMIT = 3;

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
        <Query query={catalogItemsQuery} variables={{ shopId: primaryShopId, first: PAGE_LIMIT }}>
          {({ loading, data, fetchMore }) => {
            if (loading) return null;

            const { catalogItems } = data || {};

            return (
              <Component
                {...this.props}
                catalogItemsPageInfo={paganation({
                  fetchMore,
                  data,
                  queryName: "catalogItems",
                  limit: PAGE_LIMIT
                })}
                catalogItems={catalogItems && catalogItems.edges}
              />
            );
          }}
        </Query>
      );
    }
  }
);

import React from "react";
import { inject, observer } from "mobx-react";
import { Query } from "react-apollo";
import catalogItemsQuery from "./catalogItems.gql";

const limit = 24;

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
        <Query query={catalogItemsQuery} variables={{ shopId: primaryShopId, first: limit }}>
          {({ loading: loadingShopData, data: catalogData, fetchMore }) => {
            if (loadingShopData) return null;

            const { catalogItems } = catalogData || {};

            return (
              <Component
                catalogItems={catalogItems && catalogItems.edges}
                catalogItemsPageInfo={{
                  ...((catalogItems && catalogItems.pageInfo) || {}),
                  loadPreviousPage: () => {
                    fetchMore({
                      variables: {
                        shopId: primaryShopId,
                        last: limit,
                        first: null,
                        before: catalogItems.pageInfo.endCursor
                      },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        const { catalogItems: newCatalogItems } = fetchMoreResult;

                        // Return with additional results
                        if (newCatalogItems.edges.length) {
                          return fetchMoreResult;
                        }

                        // Send the previous result if the new result contians no additional data
                        return previousResult;
                      }
                    });
                  },
                  loadNextPage: () => {
                    fetchMore({
                      variables: {
                        shopId: primaryShopId,
                        first: limit,
                        after: catalogItems.pageInfo.endCursor
                      },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        const { catalogItems: newCatalogItems } = fetchMoreResult;

                        // Return with additional results
                        if (newCatalogItems.edges.length) {
                          return fetchMoreResult;
                        }

                        // Send the previous result if the new result contians no additional data
                        return previousResult;
                      }
                    });
                  }
                }}
              />
            );
          }}
        </Query>
      );
    }
  }
);

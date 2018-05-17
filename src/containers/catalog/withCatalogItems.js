import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Query } from "react-apollo";
import { pagination, paginationVariablesFromUrlParams } from "lib/helpers/pagination";
import catalogItemsQuery from "./catalogItems.gql";

const PAGE_LIMIT = 24;

/**
 * withCatalogItems higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItems
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default (Component) => {
  @inject("primaryShopId")
  @inject("routingStore")
  @observer
  class CatalogItems extends React.Component {
    static propTypes = {
      primaryShopId: PropTypes.string.isRequired,
      routingStore: PropTypes.object
    }

    render() {
      const { primaryShopId, routingStore } = this.props || {};
      const variables = {
        shopId: primaryShopId,
        ...paginationVariablesFromUrlParams(routingStore.query, { defaultPageLimit: PAGE_LIMIT })
      };

      return (
        <Query query={catalogItemsQuery} variables={variables}>
          {({ loading, data, fetchMore }) => {
            if (loading) return null;

            const { catalogItems } = data || {};

            return (
              <Component
                {...this.props}
                catalogItemsPageInfo={pagination({
                  fetchMore,
                  routingStore,
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

  return CatalogItems;
};

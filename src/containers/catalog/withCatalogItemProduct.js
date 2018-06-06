import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import catalogItemProductQuery from "./catalogItemProduct.gql";

/**
 * withCatalogItem higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItem
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default (Component) => (
  class WithCatalogItem extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired
    }

    render() {
      const { slugOrId } = this.props.router.query;

      return (
        <Query query={catalogItemProductQuery} variables={{ slugOrId }}>
          {({ loading, data }) => {
            if (loading) return null;

            const { catalogItemProduct } = data || {};

            return (
              <Component {...this.props} product={catalogItemProduct.product} />
            );
          }}
        </Query>
      );
    }
  }
);

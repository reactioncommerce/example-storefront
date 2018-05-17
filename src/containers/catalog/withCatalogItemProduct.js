import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Query } from "react-apollo";
import withData from "lib/apollo/withData";
import catalogItemProductQuery from "./catalogItemProduct.gql";

/**
 * withCatalogItem higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItem
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default (Component) => (
  @withData
  @observer
  class WithCatalogItem extends React.Component {
    static propTypes = {
      url: PropTypes.object.isRequired
    }

    render() {
      const { slugOrId } = this.props.url.query;

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

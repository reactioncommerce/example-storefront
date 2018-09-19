import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Error from "../../pages/_error";
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
      router: PropTypes.object.isRequired,
      shop: PropTypes.object.isRequired
    }

    render() {
      const { router: { query }, shop } = this.props;

      return (
        <Query query={catalogItemProductQuery} variables={{ slugOrId: query.slugOrId }}>
          {({ loading, data }) => {
            const { catalogItemProduct } = data;
            const { product } = catalogItemProduct || {};

            if (!loading && !product) {
              return <Error shop={shop} subtitle="Not Found" />;
            }

            return (
              <Component {...this.props} isLoadingProduct={loading} product={product} />
            );
          }}
        </Query>
      );
    }
  }
);

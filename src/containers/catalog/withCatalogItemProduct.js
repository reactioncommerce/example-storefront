import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import catalogItemProductQuery from "./catalogItemProduct.gql";

/**
 * withCatalogItemProduct higher order query component for fetching primaryShopId and catalog data
 * @name withCatalogItemProduct
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default function withCatalogItemProduct(Component) {
  class WithCatalogItemProduct extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired
    }

    render() {
      const { router: { query } } = this.props;

      return (
        <Query errorPolicy="all" query={catalogItemProductQuery} variables={{ slugOrId: query.slugOrId }}>
          {({ data, loading }) => {
            const { catalogItemProduct } = data || {};
            const { product } = catalogItemProduct || {};

            return (
              <Component {...this.props} isLoadingProduct={loading} product={product} />
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithCatalogItemProduct, Component);

  return WithCatalogItemProduct;
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import Layout from "components/Layout";
import ProductDetail from "components/ProductDetail";

@withData
@withRoot
@withShop
@withCatalogItemProduct
class ProductDetailPage extends Component {
  static propTypes = {
    /**
     * Catalog Product item
     */
    product: PropTypes.object.isRequired,
    shop: PropTypes.object.isRequired
  }

  render() {
    return (
      <Layout>
        <ProductDetail product={this.props.product} shop={this.props.shop} />
      </Layout>
    );
  }
}

export default ProductDetailPage;

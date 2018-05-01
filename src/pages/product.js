import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import Layout from "components/Layout";
import ProductDetail from "components/ProductDetail";

// TODO: Data will eventually come from GraphQL
import sampleData from "components/ProductDetail/__mocks__/productData.mock";

@withData
@withRoot
@withShop
@withCatalogItemProduct
@inject("uiStore")
@observer
class ProductDetailPage extends Component {
  static propTypes = {
    /**
     * Catalog Product item
     */
    product: PropTypes.object
  }

  render() {
    return (
      <Layout>
        <ProductDetail product={this.props.product} />
      </Layout>
    );
  }
}

export default ProductDetailPage;

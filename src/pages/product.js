import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductDetailComponent from "components/ProductDetail";

@withData
@withRoot
@withShop
@inject("uiStore")
@observer
class ProductDetail extends Component {
  static propTypes = {
    /**
     * Catalog Product item
     */
    catalogProduct: PropTypes.object
  }

  render() {
    return (
      <Layout>
        <ProductDetailComponent />
      </Layout>
    );
  }
}

export default ProductDetail;

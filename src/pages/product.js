import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductDetail from "components/ProductDetail";

// TODO: Data will eventually come from GraphQL
import sampleData from "components/ProductDetail/sampleData";

@withData
@withRoot
@withShop
@inject("uiStore")
@observer
class ProductDetailPage extends Component {
  static propTypes = {
    /**
     * Catalog Product item
     */
    catalogProduct: PropTypes.object
  }

  render() {
    return (
      <Layout>
        <ProductDetail catalogProduct={sampleData} />
      </Layout>
    );
  }
}

export default ProductDetailPage;

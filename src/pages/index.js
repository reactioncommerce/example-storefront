import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductGrid from "components/ProductGrid";

@withData
@withRoot
@withShop
@inject("uiStore")
@observer
class Shop extends Component {
  static propTypes = {};

  static defaulProps = {};

  render() {
    return (
      <Layout title="Reaction Shop">
        <ProductGrid />
      </Layout>
    );
  }
}

export default Shop;

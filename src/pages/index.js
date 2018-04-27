import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import withData from "lib/apollo/withData";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductGrid from "components/ProductGrid";

@withData
@withShop
@withCatalogItems
@withRoot
@inject("uiStore")
@observer
class Shop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired
  };

  render() {
    return (
      <Layout title="Reaction Shop">
        <ProductGrid
          catalogItems={this.props.catalogItems}
          pageInfo={this.props.catalogItemsPageInfo}
        />
      </Layout>
    );
  }
}

export default Shop;

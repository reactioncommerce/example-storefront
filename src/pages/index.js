import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";

import withData from "lib/apollo/withData";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductGrid from "components/ProductGrid";

@withData
@withRoot
@withShop
@withCatalogItems
@inject("shop")
@inject("uiStore")
@observer
class Shop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    catalogItemsPageInfo: PropTypes.object,
    shop: PropTypes.object
  };

  renderHelmet() {
    const { shop } = this.props;

    return (
      <Helmet>
        <title>{shop.name}</title>
        <meta name="description" content={shop.description} />
      </Helmet>
    );
  }

  render() {
    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <ProductGrid
          catalogItems={this.props.catalogItems}
          pageInfo={this.props.catalogItemsPageInfo}
        />
      </Layout>
    );
  }
}

export default Shop;

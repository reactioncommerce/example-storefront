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
        <title>{shop && shop.name}</title>
        <meta name="description" content={shop && shop.description} />
      </Helmet>
    );
  }

  render() {
    const { catalogItems, catalogItemsPageInfo } = this.props;

    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <ProductGrid
          catalogItems={catalogItems}
          pageInfo={catalogItemsPageInfo}
        />
      </Layout>
    );
  }
}

export default Shop;

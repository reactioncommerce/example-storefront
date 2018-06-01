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
import trackProductListViewed from "lib/tracking/trackProductListViewed";

@withData
@withRoot
@withShop
@withCatalogItems
@inject("shop")
@inject("routingStore")
@inject("uiStore")
@trackProductListViewed({ dispatchOnMount: true })
@observer
class Shop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    routingStore: PropTypes.object,
    shop: PropTypes.object,
    uiStore: PropTypes.object.isRequired
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

  // TODO: move this handler to _app.js, when it becomes available.
  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  }

  // TODO: move this handler to _app.js, when it becomes available.
  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  }

  render() {
    const { catalogItems, catalogItemsPageInfo, uiStore, routingStore } = this.props;
    const pageSize = parseInt(routingStore.query.limit, 10) || uiStore.pageSize;
    const sortBy = routingStore.query.sortby || uiStore.sortBy;

    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <ProductGrid
          catalogItems={catalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        />
      </Layout>
    );
  }
}

export default Shop;

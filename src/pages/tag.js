import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withData from "lib/apollo/withData";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withTag from "containers/tags/withTag";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductGrid from "components/ProductGrid";
import ProductGridHero from "components/ProductGridHero";


@withData
@withRoot
@withShop
@withCatalogItems
@inject("shop")
@inject("routingStore")
@withTag
@observer
export default class TagShop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    catalogItemsPageInfo: PropTypes.object,
    classes: PropTypes.object,
    routingStore: PropTypes.object,
    shop: PropTypes.object,
    tag: PropTypes.object
  };

  static defaultProps= {
    tag: {}
  };

  renderHelmet() {
    const { shop, routingStore } = this.props;
    const title = routingStore.query.slug || shop.name;
    const pageTitle = title[0].toUpperCase() + title.slice(1); // TODO: rethink capitalization of tag

    return (
      <Helmet>
        <title>{pageTitle}</title>
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
    const { catalogItems, catalogItemsPageInfo, routingStore, uiStore, tag } = this.props;
    const pageSize = parseInt(routingStore.query.limit, 10) || uiStore.pageSize;
    const sortBy = routingStore.query.sortby || uiStore.sortBy;

    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <ProductGridHero tag={tag} />
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

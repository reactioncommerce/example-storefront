import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withTag from "containers/tags/withTag";
import ProductGrid from "components/ProductGrid";
import ProductGridHero from "components/ProductGridHero";
import trackProductListViewed from "lib/tracking/trackProductListViewed";

@withCatalogItems
@withTag
@trackProductListViewed({ dispatchOnMount: true })
@observer
export default class TagShop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    catalogItemsPageInfo: PropTypes.object,
    classes: PropTypes.object,
    routingStore: PropTypes.object,
    setPageSize: PropTypes.func,
    setSortBy: PropTypes.func,
    shop: PropTypes.object,
    tag: PropTypes.object,
    uiStore: PropTypes.object
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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

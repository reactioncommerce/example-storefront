import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withTag from "containers/tags/withTag";
import ProductGrid from "components/ProductGrid";
import ProductGridHero from "components/ProductGridHero";
import trackProductListViewed from "lib/tracking/trackProductListViewed";

@withTag @withCatalogItems
@inject("routingStore")
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
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tag: PropTypes.object,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      sortBy: PropTypes.string.isRequired
    })
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

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  }

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  }

  render() {
    const { catalogItems, catalogItemsPageInfo, routingStore: { query }, shop, tag, uiStore } = this.props;
    const pageSize = (query && query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = (query && query.sortby) ? query.sortby : uiStore.sortBy;

    return (
      <React.Fragment>
        {this.renderHelmet()}
        <ProductGridHero tag={tag} />
        <ProductGrid
          catalogItems={catalogItems}
          currencyCode={shop.currency.code}
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

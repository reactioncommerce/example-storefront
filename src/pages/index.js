import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import ProductGrid from "components/ProductGrid";
import trackProductListViewed from "lib/tracking/trackProductListViewed";

@withCatalogItems
@inject("routingStore", "uiStore")
@observer
class Shop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tag: PropTypes.object,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired
    })
  };

  @trackProductListViewed()
  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTag({});
  }

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  render() {
    const { catalogItems, catalogItemsPageInfo, uiStore, routingStore: { query }, shop } = this.props;
    const pageSize = query && query.limit ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

    return (
      <React.Fragment>
        <Helmet>
          <title>{shop && shop.name}</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
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

export default Shop;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import ProductGrid from "components/ProductGrid";
import trackProductListViewed from "lib/tracking/trackProductListViewed";
import { inPageSizes } from "lib/utils/pageSizes";

@withCatalogItems
@inject("routingStore", "uiStore")
@observer
class ProductGridPage extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    initialGridSize: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
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

  static async getInitialProps({ req }) {
    // It is not perfect, but the only way we can guess at the screen width of the
    // requesting device is to parse the `user-agent` header it sends.
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    const width = (userAgent && userAgent.indexOf("Mobi")) > -1 ? 320 : 1024;

    return { initialGridSize: { width } };
  }

  @trackProductListViewed()
  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.catalogItems !== prevProps.catalogItems) {
      this.trackEvent(this.props);
    }
  }

  @trackProductListViewed()
  trackEvent() {}

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  render() {
    const {
      catalogItems,
      catalogItemsPageInfo,
      initialGridSize,
      isLoadingCatalogItems,
      routingStore: { query },
      shop,
      uiStore
    } = this.props;
    const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;
    const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

    return (
      <Fragment>
        <Helmet
          title={pageTitle}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <ProductGrid
          catalogItems={catalogItems}
          currencyCode={shop.currency.code}
          initialSize={initialGridSize}
          isLoadingCatalogItems={isLoadingCatalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        />
      </Fragment>
    );
  }
}

export default ProductGridPage;

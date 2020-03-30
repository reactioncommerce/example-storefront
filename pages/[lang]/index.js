import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import ProductGrid from "components/ProductGrid";
import Layout from "components/Layout";
// import trackProductListViewed from "lib/tracking/trackProductListViewed";
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

class ProductGridPage extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
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

  // @trackProductListViewed()
  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.catalogItems !== prevProps.catalogItems) {
      // this.trackEvent(this.props);
    }
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
    const {
      catalogItems,
      catalogItemsPageInfo,
      isLoadingCatalogItems,
      routingStore: { query },
      shop,
      uiStore
    } = this.props;
    const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

    let pageTitle;
    if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
    } else {
      pageTitle = "Storefront";
    }

    return (
      <Layout shop={shop}>
        <Helmet
          title={pageTitle}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <ProductGrid
          catalogItems={catalogItems}
          currencyCode={(shop && shop.currency && shop.currency.code) || "USD"}
          isLoadingCatalogItems={isLoadingCatalogItems}
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

export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(ProductGridPage)));

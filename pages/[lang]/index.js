import React, { useEffect } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import ProductGrid from "components/ProductGrid";
import Layout from "components/Layout";
import { inPageSizes } from "lib/utils/pageSizes";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import useTrackerEvents from "hooks/analytics/useTrackerEvents";

const ProductGridPage = (props) => {
  const {
    catalogItems,
    catalogItemsPageInfo,
    isLoadingCatalogItems,
    routingStore: { query },
    shop,
    uiStore,
    tag
  } = props;

  const { trackProductListViewedEvent } = useTrackerEvents();

  useEffect(() => {
    if (Array.isArray(catalogItems) && catalogItems.length > 0) {
      trackProductListViewedEvent({ catalogItems, tag });
    }
  }, [catalogItems]);

  useEffect(() => {
    const { routingStore } = props;
    return routingStore.setTagId(null);
  }, []);

  const setPageSize = (pageSize) => {
    props.routingStore.setSearch({ limit: pageSize });
    props.uiStore.setPageSize(pageSize);
  };

  const setSortBy = (sortBy) => {
    props.routingStore.setSearch({ sortby: sortBy });
    props.uiStore.setSortBy(sortBy);
  };

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
        setPageSize={setPageSize}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
    </Layout>
  );
};

ProductGridPage.propTypes = {
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


/**
 *  Static props for the main layout
 *
 * @param {String} lang - the shop's language
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  const primaryShop = await fetchPrimaryShop(lang);
  const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        ...translations
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1 // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...translations
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
}

/**
 *  Static paths for the main layout
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(ProductGridPage)));

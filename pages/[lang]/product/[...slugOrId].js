import React, { useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import withCart from "containers/cart/withCart";
import ProductDetail from "components/ProductDetail";
import PageLoading from "components/PageLoading";
import Layout from "components/Layout";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

/**
 *
 * @name buildJSONLd
 * @summary Builds a JSONLd object from product properties.
 * @return {String} Stringified product jsonld
 */
function buildJSONLd(product, shop) {
  if (!product || !shop) return "";

  const currencyCode = shop.currency.code || "USD";
  const priceData = product.pricing[0];
  const images = product.media.map((image) => image.URLs.original);

  let productAvailability = "http://schema.org/InStock";
  if (product.isLowQuantity) {
    productAvailability = "http://schema.org/LimitedAvailability";
  }
  if (product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/PreOrder";
  }
  if (!product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/SoldOut";
  }

  // Recommended data from https://developers.google.com/search/docs/data-types/product
  const productJSON = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "brand": product.vendor,
    "description": product.description,
    "image": images,
    "name": product.title,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "priceCurrency": currencyCode,
      "price": priceData.minPrice,
      "availability": productAvailability,
      "seller": {
        "@type": "Organization",
        "name": shop.name
      }
    }
  };

  return JSON.stringify(productJSON);
}

function ProductDetailPage({ addItemsToCart, product, isLoadingProduct, shop }) {
  const router = useRouter();
  const currencyCode = (shop && shop.currency.code) || "USD";
  const JSONLd = useMemo(() => buildJSONLd(product, shop), [product, shop]);

  if (isLoadingProduct || router.isFallback) return <PageLoading />;
  if (!product) return <ErrorPage shop={shop} subtitle="Not Found" />;

  return (
    <Layout shop={shop}>
      <Helmet
        title={`${product && product.title} | ${shop && shop.name}`}
        meta={[{ name: "description", content: product && product.description }]}
        script={[{ type: "application/ld+json", innerHTML: JSONLd }]}
      />
      <ProductDetail
        addItemsToCart={addItemsToCart}
        currencyCode={currencyCode}
        product={product}
        shop={shop}
      />
    </Layout>
  );
}

ProductDetailPage.propTypes = {
  /**
   * Function to add items to a cart, usually using the addItemsToCart from @withCart decorator.
   *
   * @example addItemsToCart(CartItemInput)
   * @type function
   */
  addItemsToCart: PropTypes.func,
  isLoadingProduct: PropTypes.bool,
  /**
   * Catalog Product item
   */
  product: PropTypes.object,
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  })
};

export async function getStaticProps({ params: { slugOrId, lang } }) {
  const productSlug = slugOrId && slugOrId[0];

  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common", "productDetail"]),
      ...await fetchCatalogProduct(productSlug),
      ...await fetchAllTags(lang)
    },
    revalidate: 120 // Revalidate each two minutes
  };
}

export async function getStaticPaths() {
  return {
    paths: locales.map(locale => ({ params: { lang: locale, slugOrId: ["-"] } })),
    fallback: true
  };
}

export default withApollo()(withCart(ProductDetailPage));

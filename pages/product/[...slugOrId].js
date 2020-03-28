import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import withCart from "containers/cart/withCart";
import ProductDetail from "components/ProductDetail";
import PageLoading from "components/PageLoading";
import ErrorPage from "../_error";
import { withApollo } from "lib/apollo/withApollo";

import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";

class ProductDetailPage extends Component {
  static propTypes = {
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

  /**
   *
   * @name buildJSONLd
   * @summary Builds a JSONLd object from product properties.
   * @return {String} Stringified product jsonld
   */
  buildJSONLd() {
    const { product, shop } = this.props;

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

  renderMainArea() {
    const { addItemsToCart, isLoadingProduct, product, shop } = this.props;
    const currencyCode = (shop && shop.currency.code) || "USD";

    if (isLoadingProduct) return <PageLoading />;

    if (!product) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <ProductDetail
        addItemsToCart={addItemsToCart}
        currencyCode={currencyCode}
        product={product}
        shop={shop}
      />
    );
  }

  render() {
    const { product, shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`${product && product.title} | ${shop && shop.name}`}
          meta={[{ name: "description", content: product && product.description }]}
          script={[{ type: "application/ld+json", innerHTML: this.buildJSONLd() }]}
        />
        {this.renderMainArea()}
      </Fragment>
    );
  }
}

export async function getStaticProps({ params: { slugOrId } }) {
  const productSlug = slugOrId && slugOrId[0];

  console.log("slugOrId", slugOrId);

  return {
    props: {
      ...await fetchCatalogProduct(productSlug),
      ...await fetchPrimaryShop()
    },
    revalidate: 120 // Revalidate each two minutes
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slugOrId: ["-"] } },
      { params: { slugOrId: ["-"] } }
    ],
    fallback: true
  };
}

export default withApollo()(withCart(ProductDetailPage));

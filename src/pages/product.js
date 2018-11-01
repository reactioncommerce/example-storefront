import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import withCart from "containers/cart/withCart";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import withGoogleSiteVerificationToken from "containers/googleSiteVerificationToken/withGoogleSiteVerificationToken";
import ProductDetail from "components/ProductDetail";
import PageLoading from "components/PageLoading";
import ErrorPage from "./_error";

@withGoogleSiteVerificationToken
@withCart
@withCatalogItemProduct
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
    }),
    siteVerificationToken: PropTypes.string,
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired
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
    const { addItemsToCart, isLoadingProduct, product, shop, tags } = this.props;
    const currencyCode = (shop && shop.currency.code) || "USD";

    if (isLoadingProduct) return <PageLoading />;

    if (!product) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <ProductDetail
        addItemsToCart={addItemsToCart}
        currencyCode={currencyCode}
        product={product}
        shop={shop}
        tags={tags}
      />
    );
  }

  render() {
    const { product, shop, siteVerificationToken } = this.props;
    const metaTags = [{ name: "description", content: product && product.description }];
    if (siteVerificationToken) {
      metaTags.push({ name: "google-site-verification", content: siteVerificationToken });
    }

    return (
      <Fragment>
        <Helmet
          title={`${product && product.title} | ${shop && shop.name}`}
          meta={metaTags}
          script={[{ type: "application/ld+json", innerHTML: this.buildJSONLd() }]}
        />
        {this.renderMainArea()}
      </Fragment>
    );
  }
}

export default ProductDetailPage;

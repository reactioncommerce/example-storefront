import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import withCart from "containers/cart/withCart";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import ProductDetail from "components/ProductDetail";

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
    /**
     * Catalog Product item
     */
    product: PropTypes.object.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
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
    const currencyCode = this.props.shop.currency.code || "USD";
    const { product, shop } = this.props;

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

  render() {
    const currencyCode = this.props.shop.currency.code || "USD";
    const { product, shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`${product && product.title} | ${shop && shop.name}`}
          meta={{ name: "description", content: product && product.description }}
          script={[{ type: "application/ld+json", innerHTML: this.buildJSONLd() }]}
        />
        <ProductDetail
          addItemsToCart={this.props.addItemsToCart}
          currencyCode={currencyCode}
          product={this.props.product}
          shop={this.props.shop}
          tags={this.props.tags}
        />
      </Fragment>
    );
  }
}

export default ProductDetailPage;

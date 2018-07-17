import React, { Component } from "react";
import PropTypes from "prop-types";
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
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired
    })
  }

  render() {
    const currencyCode = this.props.shop.currency.code || "USD";

    return (
      <ProductDetail
        addItemsToCart={this.props.addItemsToCart}
        currencyCode={currencyCode}
        product={this.props.product}
        shop={this.props.shop}
        tags={this.props.tags}
      />
    );
  }
}

export default ProductDetailPage;

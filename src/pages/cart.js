import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import { Router } from "routes";
import withCatalogItems from "containers/catalog/withCatalogItems";
import { Container, Row, Col } from "react-grid-system";
import PageLoading from "components/PageLoading";
import track from "lib/tracking/track";
import variantById from "lib/utils/variantById";
import trackCartItems from "lib/tracking/trackCartItems";
import TRACKING from "lib/tracking/constants";
import CartShipment from "components/CartShipment";
import ProductList from "../components/ProductList";
import InfoCarousel from "../components/InfoCarousel";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

@withCart
@withCatalogItems
@inject("uiStore")
@track()
@observer
class CartPage extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      totalItems: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        fulfillmentTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    catalogItems: PropTypes.array,
    hasMoreCartItems: PropTypes.bool,
    isLoadingCart: PropTypes.bool,
    isLoadingCatalogItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  componentDidMount() {
    const { cart } = this.props;

    // Track a cart view event
    if (cart && Array.isArray(cart.items) && cart.items.length) {
      this.trackAction({ cartItems: cart.items, cartId: cart._id, action: TRACKING.CART_VIEWED });
    }
  }

  handleClick = () => Router.pushRoute("/");

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  @trackCartItems()
  trackAction() {}

  handleRemoveItem = async (itemId) => {
    const {
      cart: { items },
      onRemoveCartItems
    } = this.props;

    const { data, error } = await onRemoveCartItems(itemId);

    if (data && !error) {
      const {
        cart: { _id }
      } = data.removeCartItems;
      const removedItem = { cart_id: _id, ...variantById(items, itemId) }; // eslint-disable-line camelcase

      // Track removed item
      this.trackAction({ cartItems: removedItem, action: TRACKING.PRODUCT_REMOVED });
    }
  };

  renderCartItems() {
    const { cart, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <CartItems
          hasMoreCartItems={hasMoreCartItems}
          onLoadMoreCartItems={loadMoreCartItems}
          items={cart.items}
          onChangeCartItemQuantity={this.handleItemQuantityChange}
          onRemoveItemFromCart={this.handleRemoveItem}
        />
      );
    }

    return (
      <Container>
        <span>Você ainda não tem nenhum item no carrinho...</span>
      </Container>
    );
  }

  renderCartSummary() {
    const { cart } = this.props;

    if (cart && cart.checkout && cart.checkout.summary && Array.isArray(cart.items) && cart.items.length) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;
      return (
        <Container>
          <Row align="center" justify="center">
            <CartSummary
              displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
              displaySubtotal={itemTotal && itemTotal.displayAmount}
              displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
              displayTax={taxTotal && taxTotal.displayAmount}
              displayTotal={total && total.displayAmount}
              itemsQuantity={cart.totalItemQuantity}
            />
            <Col sm={12}>
              <CheckoutButtons />
            </Col>
          </Row>
        </Container>
      );
    }
    return null;
  }

  render() {
    const { cart, shop, catalogItems, isLoadingCatalogItems } = this.props;
    // when a user has no item in cart in a new session, this.props.cart is null
    // when the app is still loading, this.props.cart is undefined
    if (typeof cart === "undefined") return <PageLoading delay={0} />;
    return (
      <Container fluid>
        <Helmet
          title={`Carrinho | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <Breadcrumbs isCart />
        <h3 variant="h6" align="center">
          Finalizar compra
        </h3>
        {this.renderCartItems()}
        {/* {this.renderCartSummary()} */}
        <CartShipment />
        <ProductList catalogItems={catalogItems} isLoadingCatalogItems={isLoadingCatalogItems} />
        <InfoCarousel />
      </Container>
    );
  }
}

export default CartPage;

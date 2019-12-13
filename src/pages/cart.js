import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import Breadcrumb from "components/Breadcrumb";
import CartShipment from "components/CartShipment";
import OrderResume from "components/OrderResume";
import Helmet from "react-helmet";
import CheckoutButtons from "components/CheckoutButtons";
import { Router } from "routes";
import withCatalogItems from "containers/catalog/withCatalogItems";
import { Container, Row, Col } from "react-grid-system";
import PageLoading from "components/PageLoading";
import trackCartItems from "lib/tracking/trackCartItems";
import track from "lib/tracking/track";
import ORDER_MOCK from "../helpers/ORDER_MOCK.json";
import ProductList from "../components/ProductList";
import InfoCarousel from "../components/InfoCarousel";
import CART_MOCK from "../helpers/CART_MOCK.json";


const CartPage = inject(
  "routingStore",
  "uiStore"
)(observer(({
  routingStore,
  shop,
  catalogItems,
  isLoadingCatalogItems,
  hasMoreCartItems,
  loadMoreCartItems,
  handleItemQuantityChange,
  handleRemoveItem
}) => {
  const cart = CART_MOCK;
  const { page } = CART_MOCK;
  const order = ORDER_MOCK;
  // when a user has no item in cart in a new session, props.cart is null
  // when the app is still loading, props.cart is undefined
  trackCartItems();

  const handleClick = () => Router.pushRoute("/");

  const renderCartSummary = () => {
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
  };
  // eslint-disable-next-line react/no-multi-comp
  const renderCartItems = () => {
    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <CartItems
          hasMoreCartItems={hasMoreCartItems}
          onLoadMoreCartItems={loadMoreCartItems}
          items={order.items}
          onChangeCartItemQuantity={handleItemQuantityChange}
          onRemoveItemFromCart={handleRemoveItem}
        />
      );
    }

    return (
      <Container>
        <CartEmptyMessage onClick={handleClick} />
      </Container>
    );
  };
  if (typeof cart === "undefined") return <PageLoading delay={0} />;
  return (
    <Container fluid>
      <Helmet title={`Cart | ${shop && shop.name}`} meta={[{ name: "description", content: shop && shop.description }]} />
      <Breadcrumb pageName={page.name} breadcrumb={page.breadcrumb}/>

      {renderCartItems()}
      {renderCartSummary()}
      <CartShipment/>

      <OrderResume order={order}/>
      <ProductList catalogItems={catalogItems} isLoadingCatalogItems={isLoadingCatalogItems}/>
      <InfoCarousel />
    </Container>
  );
}));


export default track()(withCatalogItems(withCart(CartPage)));

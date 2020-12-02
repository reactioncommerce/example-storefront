/* eslint-disable react/no-multi-comp */
import React, { useState, Fragment } from "react";
import MiniCartComponent from "@reactioncommerce/components/MiniCart/v1";
import CartItems from "components/CartItems";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import Router from "translations/i18nRouter";
import Badge from "@material-ui/core/Badge";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import useStores from "hooks/useStores";
import useCart from "hooks/cart/useCart";
import { makeStyles } from "@material-ui/core/styles";
import useTrackerEvents from "hooks/analytics/useTrackerEvents";

const useStyles = makeStyles(({ palette, zIndex }) => ({
  popper: {
    marginTop: "0.5rem",
    marginRight: "1rem",
    zIndex: zIndex.modal
  },
  cart: {
    backgroundColor: palette.common.white
  },
  emptyCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 360,
    height: 320,
    border: palette.borders.default
  },
  badge: {
    width: 20,
    height: 20,
    top: 10,
    left: 20
  }
}));


const MiniCart = () => {
  const classes = useStyles();
  const { uiStore } = useStores();
  const cart = useCart();
  const { hasMoreCartItems, loadMoreCartItems, cart: cartItems } = cart;
  const [anchorElement, setPopoverAnchorEl] = useState(null);

  const {
    trackCartViewedEvent
  } = useTrackerEvents();

  const handlePopperOpen = () => {
    const { openCart } = uiStore;
    // Track a cart view event, only if the cart contains items
    if (cartItems?.items && Array.isArray(cartItems.items) && cartItems.items.length) {
      trackCartViewedEvent({
        cartItems: cartItems.items,
        cartId: cartItems._id
      });
    }

    openCart();
  };

  const handleClick = () => Router.push("/");

  const handleLeavePopper = () => {
    const { closeCart } = uiStore;
    closeCart();
  };

  const handleCheckoutButtonClick = () => {
    handleLeavePopper();
    Router.push("/cart/checkout");
  };

  const handlePopperClose = () => {
    const { closeCart } = uiStore;
    closeCart(0);
  };

  const handleEnterPopper = () => {
    const { openCart } = uiStore;
    openCart();
  };

  const handleOnClick = () => {
    const { closeCart } = uiStore;
    closeCart();
    Router.push("/cart");
  };

  const handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = cart;
    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  const handleRemoveItem = async (itemId) => {
    const { onRemoveCartItems } = cart;
    await onRemoveCartItems(itemId);
  };

  const cartItemComponents = (cartItemProps) => (
    <CartItems
      {...cartItemProps}
      hasMoreCartItems={hasMoreCartItems}
      onRemoveItemFromCart={handleRemoveItem}
      onChangeCartItemQuantity={handleItemQuantityChange}
      onLoadMoreCartItems={loadMoreCartItems}
    />
  );

  const renderMiniCart = () => {
    if (cartItems && Array.isArray(cartItems.items) && cartItems.items.length) {
      return (
        <MiniCartComponent
          cart={cartItems}
          onCheckoutButtonClick={handleCheckoutButtonClick}
          components={{
            CartItems: cartItemComponents
          }}
        />
      );
    }

    return (
      <div className={classes.emptyCart}>
        <div>
          <CartEmptyMessage
            onClick={handleClick}
          />
        </div>
      </div>
    );
  };

  const { isCartOpen } = uiStore;
  const id = isCartOpen ? "simple-popper" : null;

  return (
    <Fragment>
      <div ref={setPopoverAnchorEl}>
        <IconButton
          color="inherit"
          onMouseEnter={handlePopperOpen}
          onMouseLeave={handlePopperClose}
          onClick={handleOnClick}
        >
          {cartItems && cartItems.totalItemQuantity > 0 ? (
            <Badge badgeContent={cartItems.totalItemQuantity} color="primary" classes={{ badge: classes.badge }}>
              <CartIcon />
            </Badge>
          ) : (
            <CartIcon />
          )}
        </IconButton>
      </div>

      <Popper
        className={classes.popper}
        id={id}
        open={isCartOpen}
        anchorEl={anchorElement}
        transition
        onMouseEnter={handleEnterPopper}
        onMouseLeave={handleLeavePopper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350} >
            <div className={classes.cart}>{renderMiniCart()}</div>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
};

export default MiniCart;

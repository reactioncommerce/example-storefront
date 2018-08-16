import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MiniCartComponent from "@reactioncommerce/components/MiniCart/v1";
import CartItems from "components/CartItems";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import { Router } from "routes";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import withCart from "containers/cart/withCart";
import withShop from "containers/shop/withShop";

const styles = ({ palette, zIndex }) => ({
  popper: {
    marginTop: "0.5rem",
    marginRight: "1rem",
    zIndex: zIndex.modal
  },
  cart: {
    backgroundColor: palette.common.white
  },
  emptyCart: {
    width: 320,
    height: 320,
    border: palette.reaction.borderColor
  }
});

const closePopper = {
  anchorElement: null,
  open: false
};

@withStyles(styles)
@withShop
@withCart
export default class MiniCart extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object.isRequired,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func
  }

  state = {
    open: false,
    anchorElement: null
  };

  handlePopperOpen = (event) => {
    const { currentTarget } = event;

    this.clearOnCloseTimeout();

    this.setState({
      anchorElement: currentTarget,
      open: true
    });
  }

  handlePopperClose = () => {
    this.onCloseTimeout = setTimeout(() => {
      this.setState(closePopper);
    }, 500);
  }

  handleEnterPopper = () => {
    this.clearOnCloseTimeout();
  }

  handleLeavePopper = () => {
    this.setState(closePopper);
  }

  handleOnClick = () => {
    this.setState(closePopper, () => Router.pushRoute("cart"));
  }

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  }

  clearOnCloseTimeout() {
    if (this.onCloseTimeout) {
      window && window.clearTimeout(this.onCloseTimeout);
    }
  }

  renderMiniCart() {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems, onRemoveCartItems } = this.props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <MiniCartComponent
          cart={cart}
          components={{
            QuantityInput: "div",
            CartItems: (cartItemProps) => (
              <CartItems
                {...cartItemProps}
                hasMoreCartItems={hasMoreCartItems}
                onRemoveItemFromCart={onRemoveCartItems}
                onChangeCartItemQuantity={this.handleItemQuantityChange}
                onLoadMoreCartItems={loadMoreCartItems}
              />
            )
          }}
        />
      );
    }

    return (
      <div className={classes.emptyCart}>
        <CartEmptyMessage onClick={this.handleClick} />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { anchorElement, open } = this.state;
    const id = open ? "simple-popper" : null;

    return (
      <Fragment>
        <IconButton color="inherit"
          onMouseEnter={this.handlePopperOpen}
          onMouseLeave={this.handlePopperClose}
          onClick={this.handleOnClick}
        >
          <CartIcon />
        </IconButton>

        <Popper
          className={classes.popper}
          id={id}
          open={open}
          anchorEl={anchorElement}
          transition
          onMouseEnter={this.handleEnterPopper}
          onMouseLeave={this.handleLeavePopper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.cart}>
                {this.renderMiniCart()}
              </div>
            </Fade>
          )}
        </Popper>
      </Fragment>
    );
  }
}

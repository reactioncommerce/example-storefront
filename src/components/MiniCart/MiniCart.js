import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import MiniCartComponent from "@reactioncommerce/components/MiniCart/v1";
import CartSummaryComponent from "@reactioncommerce/components/MiniCartSummary/v1";
import CartItemsComponent from "@reactioncommerce/components/CartItems/v1";
import CartItemComponent from "@reactioncommerce/components/CartItem/v1";
import CartItemDetailComponent from "@reactioncommerce/components/CartItemDetail/v1";
import CartItemStockWarningComponent from "@reactioncommerce/components/StockWarning/v1";
import QuantityInput from "@reactioncommerce/components/QuantityInput/v1";
import CartItemPriceComponent from "@reactioncommerce/components/Price/v1";
import Button from "@reactioncommerce/components/Button/v1";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import { withStyles } from "@material-ui/core";
import { Router } from "routes";

const styles = ({
  popover: {
    pointerEvents: "none"
  }
});

const checkout = {
  summary: {
    subtotal: {
      displayAmount: "$25.00"
    },
    tax: {
      displayAmount: "$2.50"
    }
  }
};

const items = [
  {
    _id: "123",
    attributes: [{ label: "Color", value: "Red" }, { label: "Size", value: "Medium" }],
    compareAtPrice: {
      displayAmount: "$45.00"
    },
    currentQuantity: 3,
    imageURLs: {
      small: "//placehold.it/100",
      thumbnail: "//placehold.it/100"
    },
    isLowQuantity: true,
    price: {
      displayAmount: "$20.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "Undefeated",
    quantity: 2
  },
  {
    _id: "456",
    attributes: [{ label: "Color", value: "Black" }, { label: "Size", value: "10" }],
    currentQuantity: 500,
    imageURLs: {
      small: "//placehold.it/100",
      thumbnail: "//placehold.it/100"
    },
    isLowQuantity: false,
    price: {
      displayAmount: "$78.00"
    },
    productSlug: "/product-slug",
    productVendor: "Patagonia",
    title: "Ticket to Anywhere",
    quantity: 1
  }];

@withStyles(styles)
export default class MiniCart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    anchorElement: null
  };

  handlePopoverOpen = (event) => {
    this.setState({ anchorElement: event.currentTarget });
  }

  handlePopoverClose = () => {
    this.setState({ anchorElement: null });
  }

  handleOnClick = () => {
    Router.pushRoute("checkout");
  }

  render() {
    const { classes } = this.props;
    const { anchorElement } = this.state;

    const components = {
      CartCheckoutButtonComponent: () => <Button actionType="important" isFullWidth>Checkout</Button>,
      CartSummaryComponent,
      CartItemsComponent,
      CartItemComponent,
      CartItemDetailComponent,
      CartItemStockWarningComponent,
      CartItemPriceComponent,
      // TODO: Use QuantityInput component when MUI dependency is removed.
      CartItemQuantityInputComponent: "div"
    };

    return (
      <Fragment>
        <IconButton color="inherit"
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
          onClick={this.handleOnClick}
        >
          <CartIcon />
        </IconButton>

        <Popover
          className={classes.popover}
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: "bottom"
          }}
          open={Boolean(anchorElement)}
          onClose={this.onClose}
        >
          <MiniCartComponent cart={{ checkout, items }} components={components} />
        </Popover>
      </Fragment>
    );
  }
}

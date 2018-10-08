import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import { Router } from "routes";
import variantById from "lib/utils/variantById";
import track from "lib/tracking/track";
import trackCartItems from "lib/tracking/trackCartItems";
import TRACKING from "lib/tracking/constants";

const styles = (theme) => ({
  cartEmptyMessageContainer: {
    margin: "80px 0"
  },
  checkoutButtonsContainer: {
    backgroundColor: theme.palette.reaction.black02,
    padding: theme.spacing.unit * 2
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing.unit * 4}px !important`
  },
  phoneNumber: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: "1.6rem",
    marginBottom: "3.1rem"
  },
  itemWrapper: {
    borderTop: theme.palette.borders.default,
    borderBottom: theme.palette.borders.default
  }
});

@withStyles(styles)
@withCart
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
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  handleClick = () => Router.pushRoute("/");

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  handleRemoveItem = async (itemId) => {
    const { cart: { items }, onRemoveCartItems } = this.props;

    const { data, error } = await onRemoveCartItems(itemId);

    if (data && !error) {
      const { cart: { _id } } = data.removeCartItems;
      const removedItem = { cart_id: _id, ...variantById(items, itemId) }; // eslint-disable-line camelcase

      // Track removed item
      this.trackAction({ cartItems: removedItem, action: TRACKING.PRODUCT_REMOVED });
    }
  };

  @trackCartItems()
  trackAction() {}

  renderCartItems() {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <Grid item xs={12} md={8}>
          <div className={classes.itemWrapper}>
            <CartItems
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={cart.items}
              onChangeCartItemQuantity={this.handleItemQuantityChange}
              onRemoveItemFromCart={this.handleRemoveItem}
            />
          </div>
        </Grid>
      );
    }

    return (
      <Grid item xs={12} className={classes.cartEmptyMessageContainer}>
        <CartEmptyMessage onClick={this.handleClick} />
      </Grid>
    );
  }

  renderCartSummary() {
    const { cart, classes } = this.props;

    if (cart && cart.checkout && cart.checkout.summary && Array.isArray(cart.items) && cart.items.length) {
      const { fulfillmentTotal, itemTotal, total } = cart.checkout.summary;

      return (
        <Grid item xs={12} md={3}>
          <CartSummary
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displayTotal={total && total.displayAmount}
            itemsQuantity={cart.totalItemQuantity}
          />
          <div className={classes.checkoutButtonsContainer}>
            <CheckoutButtons />
          </div>
        </Grid>
      );
    }

    return null;
  }

  render() {
    const { classes, shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`Cart | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <Typography className={classes.title} variant="title" align="center">
            Shopping Cart
          </Typography>
          <Grid container spacing={24}>
            {this.renderCartItems()}
            {this.renderCartSummary()}
            <Grid className={classes.customerSupportCopy} item>
              <Typography paragraph variant="caption">
                Have questions? call <span className={classes.phoneNumber}>1.800.555.5555</span>
              </Typography>
              <Typography paragraph variant="caption">
                <Link href="#">Shipping information</Link>
              </Typography>
              <Typography paragraph variant="caption">
                <Link href="#">Return policy</Link>
              </Typography>
            </Grid>
          </Grid>
        </section>
      </Fragment>
    );
  }
}

export default CartPage;

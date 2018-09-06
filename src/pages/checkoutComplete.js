import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import CheckoutActions from "components/CheckoutActions";
import CheckoutEmailAddress from "@reactioncommerce/components/CheckoutEmailAddress/v1";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import CartIcon from "mdi-material-ui/Cart";
import LockIcon from "mdi-material-ui/Lock";
import withCart from "containers/cart/withCart";
import Link from "components/Link";
import CheckoutSummary from "components/CheckoutSummary";
import OrderFulfillmentGroups from "components/OrderFulfillmentGroups";


const styles = (theme) => ({
  checkoutActions: {
    width: "100%",
    maxWidth: "600px",
    alignSelf: "flex-end",
    [theme.breakpoints.up("md")]: {
      paddingRight: "2rem"
    }
  },
  cartSummary: {
    maxWidth: "400px",
    alignSelf: "flex-start",
    [theme.breakpoints.up("md")]: {
      paddingRight: "2rem"
    }
  },
  checkoutContent: {
    flex: "1",
    maxWidth: theme.layout.mainContentMaxWidth,
    padding: "1rem"
  },
  checkoutContentContainer: {
    display: "flex",
    justifyContent: "center"
  },
  checkoutTitleContainer: {
    alignSelf: "flex-end",
    width: "8rem",
    [theme.breakpoints.up("md")]: {
      width: "10rem"
    }
  },
  checkoutTitle: {
    fontSize: "1.125rem",
    color: theme.palette.reaction.black35,
    display: "inline",
    marginLeft: "0.3rem"
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column"
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem"
  },
  emptyCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 320
  },
  logo: {
    color: theme.palette.reaction.reactionBlue,
    marginRight: theme.spacing.unit,
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  }
});

@withCart
@observer
@withStyles(styles, { withTheme: true })
class CheckoutComplete extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    isLoading: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  state = {}

  handleCartEmptyClick = () => Router.pushRoute("/")

  renderCheckout() {
    const {
      classes,
      cart,
      isLoading,
    } = this.props;

    if (isLoading) return null;

    if (!cart || (cart && Array.isArray(cart.items) && cart.items.length === 0)) {
      return (
        <div className={classes.emptyCartContainer}>
          <div className={classes.emptyCart}>
            <div>
              <CartEmptyMessage onClick={this.handleCartEmptyClick} />
            </div>
          </div>
        </div>
      );
    }

    const hasAccount = !!cart.account;
    const displayEmail = hasAccount ? cart.account.emailRecords[0].address : cart.email;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={12}>
          <div className={classes.flexContainer}>
            <div className={classes.cartSummary}>
              <OrderFulfillmentGroups
                cart={cart}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  renderSummary() {
    const { cart } = this.props;

    if (cart && cart.checkout && cart.checkout.summary) {
      const {
        fulfillmentTotal,
        itemTotal,
        total
      } = cart.checkout.summary;

      return (
        <Grid item xs={12}>
          <CartSummary
            isDense
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displayTotal={total && total.displayAmount}
            itemsQuantity={cart.totalItemQuantity}
          />
        </Grid>
      );
    }

    return null;
  }

  render() {
    const { classes, shop } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <section className={classes.checkoutContentContainer}>
          <div className={classes.checkoutContent}>
            {this.renderCheckout()}
            {this.renderSummary()}
          </div>
        </section>
      </Fragment>
    );
  }
}

export default CheckoutComplete;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import withCart from "containers/cart/withCart";
import Link from "components/Link";
import OrderFulfillmentGroups from "components/OrderFulfillmentGroups";
import OrderSummary from "components/OrderSummary";


const styles = (theme) => ({
  section: {
    paddingTop: theme.spacing.unit * 2
  },
  sectionHeader: {
    marginBottom: theme.spacing.unit * 3
  },
  title: {
    marginBottom: theme.spacing.unit * 3
  },
  orderDetails: {
    width: "100%",
    maxWidth: 600
  },
  cartSummary: {

  },
  checkoutContent: {
    flex: "1",
    maxWidth: theme.layout.mainContentMaxWidth,
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
      <div className={classes.flexContainer}>
        <div className={classes.cartSummary}>
          <OrderFulfillmentGroups
            cart={cart}
          />
        </div>
      </div>
    );
  }

  renderSummary() {
    const { cart } = this.props;

    if (cart && cart.checkout && cart.checkout.summary) {
      return (
        <Grid item xs={12}>
          <OrderSummary order={cart} />
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
        <div className={classes.checkoutContentContainer}>
          <div className={classes.orderDetails}>
            <section className={classes.section}>
              <header className={classes.sectionHeader}>
                <Typography className={classes.title} variant="title">{"Thank you for your order"}</Typography>
                <Typography variant="body1">{"Your order number is"} <strong>{"000"}</strong></Typography>
                <Typography variant="body1">{"We've send a confirmation email to"} <strong>{"sample@email.com"}</strong></Typography>
              </header>
              <div className={classes.checkoutContent}>
                {this.renderCheckout()}
              </div>
            </section>
            <section className={classes.section}>
              {this.renderSummary()}
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CheckoutComplete;

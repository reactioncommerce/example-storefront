import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CheckoutActions from "components/CheckoutActions";
import CheckoutEmailAddress from "@reactioncommerce/components/CheckoutEmailAddress/v1";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import Entry from "components/Entry";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import CartIcon from "mdi-material-ui/Cart";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import LockIcon from "mdi-material-ui/Lock";
import Link from "components/Link";
import CheckoutSummary from "components/CheckoutSummary";
import PageLoading from "components/PageLoading";
import withCart from "containers/cart/withCart";
import withAvailablePaymentMethods from "containers/payment/withAvailablePaymentMethods";
import definedPaymentMethods from "../custom/paymentMethods";

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
    margin: "0 auto",
    maxWidth: theme.layout.mainContentMaxWidth,
    padding: "1rem"
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
  },
  // login view styles
  backLink: {
    "color": theme.palette.reaction.black80,
    "cursor": "pointer",
    "fontFamily": theme.typography.fontFamily,
    "fontSize": 14,
    "&:hover": {
      color: theme.palette.reaction.reactionBlue400
    }
  },
  backLinkText: {
    letterSpacing: "0.3px",
    lineHeight: 1.71,
    marginLeft: theme.spacing.unit,
    textDecoration: "underline"
  },
  headerFlex: {
    alignSelf: "center",
    flex: "1 1 1%"
  },
  header: {
    alignContent: "center",
    borderBottom: `solid 1px ${theme.palette.reaction.black10}`,
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainLoginMaxWidth,
    minHeight: "calc(100vh - 135px)",
    margin: "0 auto",
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 3}px 0`
    }
  },
  root: {}
});

const hasIdentityCheck = (cart) => !!((cart && cart.account !== null) || (cart && cart.email));

@withCart
@withAvailablePaymentMethods
@observer
@withStyles(styles, { withTheme: true })
class Checkout extends Component {
  static propTypes = {
    availablePaymentMethods: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })),
    cart: PropTypes.shape({
      account: PropTypes.object,
      checkout: PropTypes.object,
      email: PropTypes.string,
      items: PropTypes.array
    }),
    cartStore: PropTypes.object,
    checkoutMutations: PropTypes.object,
    classes: PropTypes.object,
    clearAuthenticatedUsersCart: PropTypes.func,
    hasMoreCartItems: PropTypes.bool,
    isLoadingAvailablePaymentMethods: PropTypes.bool,
    isLoadingCart: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    router: PropTypes.object,
    setEmailOnAnonymousCart: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  state = {};

  componentDidMount() {
    this.handleRouteChange();
  }

  componentDidUpdate() {
    this.handleRouteChange();
  }

  /**
   *
   * @name handleRouteChange
   * @summary Determines which /cart route (/cart/login || /cart/checkout) to display.
   * @return {undefined}
   */
  handleRouteChange = () => {
    const { cart } = this.props;
    // Skipping if the `cart` is not available
    if (!cart) return;
    if (hasIdentityCheck(cart) && this.pagePath === "/cart/login") {
      Router.replaceRoute("/cart/checkout", {}, { shallow: true });
    } else if (!hasIdentityCheck(cart) && this.asPath === "/cart/checkout") {
      Router.replaceRoute("/cart/login", {}, { shallow: true });
    }
  };

  handleCartEmptyClick = () => Router.pushRoute("/");

  get pagePath() {
    return this.props.router.asPath;
  }

  /**
   *
   * @name hasIdentity
   * @summary `true` if a customer is signed in or has set a "guest email" on their cart.
   * @return {Boolean} - true if cart.account or cart.email are set.
   */
  get hasIdentity() {
    const { cart } = this.props;
    return hasIdentityCheck(cart);
  }

  // render page head
  renderCheckoutHead() {
    const { shop } = this.props;
    const pageTitle = this.hasIdentity ? `Checkout | ${shop && shop.name}` : `Login | ${shop && shop.name}`;
    return <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />;
  }

  // render page top bar
  renderCheckoutTopHat() {
    return <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />;
  }

  // render page header
  renderCheckoutHeader() {
    return this.hasIdentity ? this.renderCheckoutActionsHeader() : this.renderLoginHeader();
  }

  renderLoginHeader() {
    const { classes, shop } = this.props;

    return (
      <div className={classes.header}>
        <div className={classes.headerFlex}>
          <Link route="/" className={classes.backLink}>
            <ChevronLeftIcon style={{ fontSize: 18, color: "inherit", verticalAlign: "sub", transition: "none" }} />
            <span className={classes.backLinkText}>Back</span>
          </Link>
        </div>

        <Link route="home">
          <div className={classes.logo}>
            <ShopLogo shopName={shop.name} />
          </div>
        </Link>

        <div className={classes.headerFlex} />
      </div>
    );
  }

  renderCheckoutActionsHeader() {
    const { classes, shop, theme } = this.props;
    return (
      <div className={classes.headerContainer}>
        <Link route="home">
          <div className={classes.logo}>
            <ShopLogo shopName={shop.name} />
          </div>
        </Link>
        <div className={classes.checkoutTitleContainer}>
          <LockIcon
            style={{
              fontSize: 14,
              color: theme.palette.reaction.black35
            }}
          />
          <Typography className={classes.checkoutTitle}>Checkout</Typography>
        </div>
        <Link route="cart">
          <CartIcon />
        </Link>
      </div>
    );
  }

  renderCheckoutContent() {
    const { cart, router: { asPath } } = this.props;
    // sanity check that "tries" to render the correct /cart view if SSR doesn't provide the `cart`
    if (!cart) return asPath === "/cart/checkout" ? this.renderCheckoutActions() : this.renderCheckoutLogin();
    return this.hasIdentity ? this.renderCheckoutActions() : this.renderCheckoutLogin();
  }

  // render page content: login || checkout
  renderCheckoutLogin() {
    const { classes, setEmailOnAnonymousCart } = this.props;

    return (
      <main className={classes.main}>
        <Entry setEmailOnAnonymousCart={setEmailOnAnonymousCart} />
      </main>
    );
  }

  renderCheckoutActions() {
    const {
      availablePaymentMethods,
      classes,
      cart,
      cartStore,
      checkoutMutations,
      clearAuthenticatedUsersCart,
      hasMoreCartItems,
      loadMoreCartItems,
      onRemoveCartItems,
      onChangeCartItemsQuantity
    } = this.props;

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
    const orderEmailAddress = (hasAccount && Array.isArray(cart.account.emailRecords) && cart.account.emailRecords[0].address) || cart.email;

    // Filter the hard-coded definedPaymentMethods list from the client to remove any
    // payment methods that were not returned from the API as currently available.
    const paymentMethods = definedPaymentMethods.filter((method) =>
      !!availablePaymentMethods.find((availableMethod) => availableMethod.name === method.name));

    return (
      <div className={classes.checkoutContentContainer}>
        <div className={classes.checkoutContent}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={7}>
              <div className={classes.flexContainer}>
                <div className={classes.checkoutActions}>
                  {orderEmailAddress ? (
                    <CheckoutEmailAddress emailAddress={orderEmailAddress} isAccountEmail={hasAccount} />
                  ) : null}
                  <CheckoutActions
                    cart={cart}
                    cartStore={cartStore}
                    checkoutMutations={checkoutMutations}
                    clearAuthenticatedUsersCart={clearAuthenticatedUsersCart}
                    orderEmailAddress={orderEmailAddress}
                    paymentMethods={paymentMethods}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <div className={classes.flexContainer}>
                <div className={classes.cartSummary}>
                  <CheckoutSummary
                    cart={cart}
                    hasMoreCartItems={hasMoreCartItems}
                    onRemoveCartItems={onRemoveCartItems}
                    onChangeCartItemsQuantity={onChangeCartItemsQuantity}
                    onLoadMoreCartItems={loadMoreCartItems}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  render() {
    const {
      isLoadingCart,
      isLoadingAvailablePaymentMethods
    } = this.props;

    if (isLoadingCart || isLoadingAvailablePaymentMethods) {
      return <PageLoading delay={0} />;
    }

    return (
      <Fragment>
        {this.renderCheckoutHead()}
        {this.renderCheckoutTopHat()}
        {this.renderCheckoutHeader()}
        {this.renderCheckoutContent()}
      </Fragment>
    );
  }
}

export default Checkout;

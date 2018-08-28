import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@reactioncommerce/components/Button/v1";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import GuestForm from "@reactioncommerce/components/GuestForm/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import withCart from "containers/cart/withCart";
import Link from "components/Link";

import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";

const styles = (theme) => ({
  // loginWrapper: {
  //   maxWidth: "600px",
  //   alignSelf: "flex-end",
  //   [theme.breakpoints.up("md")]: {
  //     paddingRight: "2rem"
  //   }
  // },
  // guestWrapper: {
  //   maxWidth: "400px",
  //   alignSelf: "flex-start",
  //   [theme.breakpoints.up("md")]: {
  //     paddingRight: "2rem"
  //   }
  // },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainContentMaxWidth,
    margin: "0 auto",
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  headerCenter: {},
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
  backLink: {
    color: theme.palette.reaction.black80,
    cursor: "pointer",
    fontFamily: theme.typography.fontFamily,
    fontSize: 14
  },
  backLinkText: {
    letterSpacing: "0.3px",
    lineHeight: 1.71,
    marginLeft: theme.spacing.unit,
    textDecoration: "underline"
  },

  logo: {
    color: theme.palette.reaction.reactionBlue,
    margin: "auto",
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  }
});

@withCart
@withStyles(styles, { withTheme: true })
export default class Login extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      account: PropTypes.object,
      email: PropTypes.string
    }),
    classes: PropTypes.object,
    setEmailOnAnonymousCart: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  static getDerivedStateFromProps({ cart }) {
    if (cart.account !== null || cart.email) Router.back();
    return null;
  }

  handleBackClick = () => {
    Router.back();
  };

  renderHeader() {
    const { classes, shop, theme } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.headerFlex}>
          <Link className={classes.backLink} onClick={this.handleBackClick}>
            <ChevronLeftIcon style={{ fontSize: 18, color: theme.palette.reaction.black80, verticalAlign: "sub" }} />
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

  renderCheckoutLogin() {
    const { classes, setEmailOnAnonymousCart } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={7}>
          <div className={classes.flexContainer}>
            <div className={classes.loginWrapper}>
              <Button onClick={() => Router.back()}>Back!</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.flexContainer}>
            <div className={classes.guestWrapper}>
              <GuestForm onSubmit={setEmailOnAnonymousCart} />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, shop } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Login</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
        <div className={classes.root}>
          {this.renderHeader()}
          <main className={classes.main}>{this.renderCheckoutLogin()}</main>
        </div>
      </Fragment>
    );
  }
}

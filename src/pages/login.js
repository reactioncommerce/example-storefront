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

const flexWrapper = () => ({
  alignItems: "stretch",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
});

const styles = (theme) => ({
  loginWrapper: {
    ...flexWrapper(theme),
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up("md")]: {
      minHeight: "400px",
      paddingBottom: 0,
      paddingRight: theme.spacing.unit * 8
    }
  },
  guestWrapper: {
    ...flexWrapper(theme),
    borderTop: `solid 1px ${theme.palette.reaction.black10}`,
    paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.up("md")]: {
      borderLeft: `solid 1px ${theme.palette.reaction.black10}`,
      borderTop: "none",
      paddingLeft: theme.spacing.unit * 8,
      paddingTop: 0
    }
  },
  backLink: {
    color: theme.palette.reaction.black80,
    cursor: "pointer",
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
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
  loginButton: {
    marginTop: theme.spacing.unit * 3
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
  logo: {
    color: theme.palette.reaction.reactionBlue,
    margin: "auto",
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
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

  handleLoginClick = () => {
    // TODO: Redirect to Auth solution
    // eslint-disable-next-line
    console.log("login buttton clicked!");
  };

  handleRegisterClick = () => {
    // TODO: Redirect to Auth solution
    // eslint-disable-next-line
    console.log("register buttton clicked!");
  };

  renderHeader() {
    const { classes, shop } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.headerFlex}>
          <Link className={classes.backLink} onClick={this.handleBackClick}>
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

  renderCheckoutLogin() {
    const { classes, setEmailOnAnonymousCart } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={7}>
          <div className={classes.loginWrapper}>
            <Typography variant="title" gutterBottom>
              Returning Customer
            </Typography>
            <Button onClick={this.handleLoginClick} actionType="important" isFullWidth className={classes.loginButton}>
              Login
            </Button>
            <Button
              onClick={this.handleRegisterClick}
              actionType="secondary"
              isFullWidth
              className={classes.loginButton}
            >
              Create a new account
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={classes.guestWrapper}>
            <Typography variant="title" gutterBottom>
              Guest Checkout
            </Typography>
            <GuestForm onSubmit={setEmailOnAnonymousCart} />
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

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import withCart from "containers/cart/withCart";
import Entry from "components/Entry";
import Link from "components/Link";

import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";

const styles = (theme) => ({
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
    }),
    theme: PropTypes.object.isRequired
  };

  state = {};

  componentDidMount() {
    const { cart } = this.props;
    if ((cart && cart.account !== null) || (cart && cart.email)) Router.back();
  }

  renderHeader() {
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

  renderEntry() {
    const { setEmailOnAnonymousCart } = this.props;
    return <Entry setEmailOnAnonymousCart={setEmailOnAnonymousCart} />;
  }

  render() {
    const { classes, shop } = this.props;
    return (
      <Fragment>
        <Helmet
          title={`Login | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
        <div className={classes.root}>
          {this.renderHeader()}
          <main className={classes.main}>{this.renderEntry()}</main>
        </div>
      </Fragment>
    );
  }
}

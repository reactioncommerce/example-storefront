import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import withCart from "containers/cart/withCart";
import Entry from "components/Entry";
import Link from "components/Link";
import Layout from "components/Layout";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

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
    marginLeft: theme.spacing(),
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
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3)
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
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10, 3, 0)
    }
  },
  root: {}
});

class Login extends Component {
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
            {shop ? <ShopLogo shopName={shop.name} /> : "Example Storefront"}
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
      <Layout shop={shop}>
        <Helmet
          title={`Login | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
        <div className={classes.root}>
          {this.renderHeader()}
          <main className={classes.main}>{this.renderEntry()}</main>
        </div>
      </Layout>
    );
  }
}

/**
 *  Static props for the login
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

/**
 *  Static paths for the login
 *
 * @returns {Object} thepaths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withCart(withStyles(styles, { withTheme: true })(Login)));

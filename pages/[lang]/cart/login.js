import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Entry from "components/Entry";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";
import useCart from "hooks/cart/useCart";
import useShop from "hooks/shop/useShop";
import useTranslation from "hooks/useTranslation";

import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchAllTags from "staticUtils/tags/fetchAllTags";

const useStyles = makeStyles((theme) => ({
  checkoutActions: {
    width: "100%",
    maxWidth: "1440px",
    alignSelf: "center",
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

  flexContainer: {
    display: "flex",
    flexDirection: "column"
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
    marginRight: theme.spacing(1),
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainLoginMaxWidth,
    minHeight: "calc(100vh - 135px)",
    margin: "0 auto",
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(10)}px ${theme.spacing(3)}px 0`
    }
  },
  root: {}
}));

const Login = ({ router }) => {
  const classes = useStyles();
  const { locale, t } = useTranslation("common");
  const shop = useShop();

  const {
    cart,
    isLoadingCart,
    setEmailOnAnonymousCart
  } = useCart();
  const hasIdentity = !!((cart && cart.account !== null) || (cart && cart.email));
  const pageTitle = `Login | ${shop && shop.name}`;

  useEffect(() => {
    // Skipping if the `cart` is not available
    if (!cart) return;
    if (hasIdentity) {
      // Router.push("/[lang]/cart/checkout", `/${locale}/cart/checkout`);
      Router.push("/cart/checkout", "/cart/checkout");
    }
  }), [cart, hasIdentity, Router];

  if (isLoadingCart) {
    return (
      <Layout router={router}>
        <PageLoading delay={0} />
      </Layout>
    );
  }

  return (
    <Layout router={router}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={shop && shop.description} />
      </Head>
      <main className={classes.main}>
        <Entry setEmailOnAnonymousCart={setEmailOnAnonymousCart} />
      </main>
    </Layout>
  );
};

Login.propTypes = {
  router: PropTypes.object
};

export async function getStaticProps() {
  return {
    props: {
      ...await fetchPrimaryShop("en"),
      ...await fetchAllTags()
    }
  };
}

export default withApollo()(Login);

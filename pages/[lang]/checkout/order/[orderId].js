import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PageLoading from "components/PageLoading";
import Layout from "components/Layout";
import withOrder from "containers/order/withOrder";
import OrderCard from "components/OrderCard";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

const styles = (theme) => ({
  orderThankYou: {
    marginBottom: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
});

class CheckoutComplete extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoadingOrder: PropTypes.bool,
    order: PropTypes.shape({
      email: PropTypes.string.isRequired,
      referenceId: PropTypes.string.isRequired
    }),
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  render() {
    const { classes, isLoadingOrder, order, shop } = this.props;

    if (isLoadingOrder) return <PageLoading message="Loading order details..." />;

    if (!order) {
      return (
        <div className={classes.checkoutContentContainer}>
          <div className={classes.orderDetails}>
            <section className={classes.section}>
              <Typography className={classes.title} variant="h6">Order not found</Typography>
            </section>
          </div>
        </div>
      );
    }

    return (
      <Layout shop={shop}>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <Grid container>
          <Grid item xs={false} md={3} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
          <Grid item xs={12} md={6}>
            <Grid item className={classes.orderThankYou} xs={12} md={12}>
              <Typography className={classes.title} variant="h6">Thank you for your order</Typography>
              <Typography variant="body1">
                {"Your order ID is:"} <strong>{order.referenceId}</strong>
              </Typography>
              <Typography variant="body1">
                {"We've sent a confirmation email to:"} <strong>{order.email}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <OrderCard isExpanded={true} order={order} />
            </Grid>
          </Grid>
          <Grid item xs={false} md={3} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
        </Grid>
      </Layout>
    );
  }
}

export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"]),
      ...await fetchAllTags(lang)
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: locales.map(locale => ({ params: { lang: locale, orderId: "-" } })),
    fallback: true
  };
}

export default withApollo()(withOrder(withStyles(styles, { withTheme: true })(CheckoutComplete)));

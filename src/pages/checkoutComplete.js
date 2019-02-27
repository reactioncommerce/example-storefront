import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import OrderFulfillmentGroup from "components/OrderFulfillmentGroup";
import PageLoading from "components/PageLoading";
import withOrder from "containers/order/withOrder";

const styles = (theme) => ({
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
  fulfillmentGroups: {},
  checkoutContent: {
    flex: "1",
    maxWidth: theme.layout.mainContentMaxWidth
  },
  checkoutContentContainer: {
    display: "flex",
    justifyContent: "center"
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column"
  }
});

@withOrder
@withStyles(styles, { withTheme: true })
class CheckoutComplete extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoadingOrder: PropTypes.bool,
    order: PropTypes.shape({
      email: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired
    }),
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  renderFulfillmentGroups() {
    const { classes, order } = this.props;

    return (
      <div className={classes.flexContainer}>
        <div className={classes.fulfillmentGroups}>
          {order.fulfillmentGroups.map((fulfillmentGroup, index) => (
            <OrderFulfillmentGroup key={`${index}`} fulfillmentGroup={fulfillmentGroup} payments={order.payments} />
          ))}
        </div>
      </div>
    );
  }

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
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <div className={classes.checkoutContentContainer}>
          <div className={classes.orderDetails}>
            <section className={classes.section}>
              <header className={classes.sectionHeader}>
                <Typography className={classes.title} variant="h6">Thank you for your order</Typography>
                <Typography variant="body1">
                  {"Your order ID is:"} <strong>{order.referenceId}</strong>
                </Typography>
                <Typography variant="body1">
                  {"We've sent a confirmation email to:"} <strong>{order.email}</strong>
                </Typography>
              </header>
              <div className={classes.checkoutContent}>{this.renderFulfillmentGroups()}</div>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CheckoutComplete;

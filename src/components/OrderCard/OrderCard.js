import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OrderCardHeader from "components/OrderCardHeader";
import OrderCardFulfillmentGroup from "components/OrderCardFulfillmentGroup";
import OrderCardSummary from "components/OrderCardSummary";
import PageLoading from "components/PageLoading";

const styles = (theme) => ({
  orderCard: {
    border: `solid 1px ${theme.palette.reaction.black10}`,
    borderRadius: "2px",
    marginBottom: theme.spacing.unit * 2.5
  },
  orderCardHeader: {},
  orderCardFulfillmentGroups: {
    marginBottom: theme.spacing.unit * 3
  },
  orderCardSummary: {
    borderTop: theme.palette.borders.default,
    paddingBottom: theme.spacing.unit,
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: theme.spacing.unit
  },



  flexContainer: {
    display: "flex",
    flexDirection: "column"
  },

});

@withStyles(styles, { withTheme: true })
class OrderCard extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoadingOrders: PropTypes.bool,
    order: PropTypes.shape({
      email: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired
    })
  };

  renderFulfillmentGroups() {
    const { classes, order: { fulfillmentGroups } } = this.props;

    fulfillmentGroups.push(fulfillmentGroups[0]);

    return (
      <div className={classes.flexContainer}>
        {fulfillmentGroups.map((fulfillmentGroup, index) => (
          <OrderCardFulfillmentGroup key={`${index}`} fulfillmentGroup={fulfillmentGroup} currentGroupCount={index + 1} totalGroupsCount={fulfillmentGroups.length} />
        ))}
      </div>
    );
  }

  renderHeader() {
    const { order } = this.props;

    return <OrderCardHeader order={order} />;
  }

  renderSummary() {
    const { order } = this.props;
    const orderSummary = order.fulfillmentGroups[0].summary;

    return <OrderCardSummary summary={orderSummary} />;
  }

  render() {
    const { classes, isLoadingOrders, order } = this.props;

    console.log(" ---------- order", order.referenceId, " ---------- ", order);

    if (isLoadingOrders) return <PageLoading message="Loading order details..." />;

    return (
      <Fragment>
        <Grid container>
          <Grid xs={12} md={12}>
            <div className={classes.orderCard}>
              <header className={classes.orderCardHeader}>
                {this.renderHeader()}
              </header>
              <section className={classes.orderCardFulfillmentGroups}>
                {this.renderFulfillmentGroups()}
              </section>
              <section className={classes.orderCardSummary}>
                {this.renderSummary()}
              </section>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default OrderCard;

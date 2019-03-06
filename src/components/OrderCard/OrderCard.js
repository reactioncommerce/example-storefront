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
  orderCardFulfillmentGroups: {},
  orderCardSummary: {
    borderTop: theme.palette.borders.default,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2
  }
});

@withStyles(styles, { withTheme: true })
class OrderCard extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isExpanded: PropTypes.bool,
    isLoadingOrders: PropTypes.bool,
    order: PropTypes.shape({
      email: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired
    })
  };

  renderFulfillmentGroups() {
    const { order: { fulfillmentGroups } } = this.props;

    return (
      <Fragment>
        {fulfillmentGroups.map((fulfillmentGroup, index) => (
          <OrderCardFulfillmentGroup
            key={`${fulfillmentGroup._id}`}
            fulfillmentGroup={fulfillmentGroup}
            currentGroupCount={index + 1}
            totalGroupsCount={fulfillmentGroups.length}
          />
        ))}
      </Fragment>
    );
  }

  renderHeader() {
    const { isExpanded, order } = this.props;

    return <OrderCardHeader isExpanded={isExpanded} order={order} />;
  }

  renderSummary() {
    const { order: { summary } } = this.props;
    return <OrderCardSummary summary={summary} />;
  }

  render() {
    const { classes, isLoadingOrders } = this.props;

    if (isLoadingOrders) return <PageLoading message="Loading order details..." />;

    return (
      <Grid container>
        <Grid item xs={12} md={12}>
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
    );
  }
}

export default OrderCard;

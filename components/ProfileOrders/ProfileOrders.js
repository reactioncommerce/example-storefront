import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import OrderCard from "components/OrderCard";
import PageStepper from "components/PageStepper";
import Select from "components/Select";
import withOrders from "containers/order/withOrders";
import ErrorPage from "../../pages/_error";

const styles = (theme) => ({
  profileOrdersContainer: {},
  profileOrdersList: {},
  profileOrdersPagination: {},
  profileOrdersSelect: {
    marginBottom: theme.spacing(4)
  },
  profileOrdersTitle: {
    marginBottom: theme.spacing(4)
  }
});

class ProfileOrders extends Component {
  static propTypes = {
    classes: PropTypes.object,
    orders: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        cursor: PropTypes.String,
        node: PropTypes.object
      })),
      pageInfo: PropTypes.object,
      totalCount: PropTypes.number
    }),
    ordersPageInfo: PropTypes.object,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    uiStore: PropTypes.shape({
      orderStatusQuery: PropTypes.array,
      setOrderStatusSelectValue: PropTypes.func
    }).isRequired
  };

  state = {
    orderStatusSelectValue: "all"
  }

  handleOrderStatusSelectChange = (event) => {
    const { routingStore, uiStore } = this.props;

    this.setState({
      orderStatusSelectValue: event.target.value
    });

    const queryFilter = [];

    if (event.target.value === "open") {
      queryFilter.push("new");
      queryFilter.push("coreOrderWorkflow/processing");
    }

    if (event.target.value === "completed") {
      queryFilter.push("coreOrderWorkflow/completed");
    }

    if (event.target.value === "canceled") {
      queryFilter.push("coreOrderWorkflow/canceled");
    }

    // Reset before and after cursors when switching order type
    routingStore.setSearch({
      before: null,
      after: null
    });
    uiStore.setOrderStatusSelectValue(queryFilter);
  };

  renderOrderTypeSelect() {
    const { orderStatusSelectValue } = this.state;

    const orderStatusSelectOptions = [
      {
        name: "All",
        value: "all"
      },
      {
        name: "Open orders",
        value: "open"
      },
      {
        name: "Completed orders",
        value: "completed"
      },
      {
        name: "Canceled orders",
        value: "canceled"
      }
    ];

    return (
      <Select
        value={orderStatusSelectValue}
        options={orderStatusSelectOptions}
        inputProps={{
          name: "orderTypeSelect",
          id: "order-type-select"
        }}
        onChange={this.handleOrderStatusSelectChange}
      />
    );
  }

  renderOrders() {
    const { orders, shop } = this.props;

    if (!orders) return <ErrorPage shop={shop} subtitle="No orders found" />;

    // Use relayConnectionToArray to remove edges / nodes levels from orders object
    const ordersToArray = (orders && relayConnectionToArray(orders)) || [];

    return ordersToArray.map((order, index) => <OrderCard key={index} order={order} />);
  }

  render() {
    const { classes, ordersPageInfo: pageInfo } = this.props;

    return (
      <Grid className={classes.profileOrdersContainer} container>
        <Grid className={classes.profileOrdersTitle} item xs={12} md={12}>
          <Typography variant="h6">Orders</Typography>
        </Grid>
        <Grid className={classes.profileOrdersSelect} item xs={12} md={12}>
          {this.renderOrderTypeSelect()}
        </Grid>
        <Grid className={classes.profileOrdersList} item xs={12} md={12}>
          {this.renderOrders()}
        </Grid>
        <Grid className={classes.profileOrdersPagination} item xs={12} md={12}>
          {pageInfo && <PageStepper pageInfo={pageInfo} />}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(withOrders(ProfileOrders)));

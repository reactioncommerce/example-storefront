import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import OrderCard from "components/OrderCard";
import Select from "components/Select";
import withOrders from "containers/order/withOrders";
import ErrorPage from "../../pages/_error";

const styles = (theme) => ({
  profileOrdersContainer: {},
  profileOrdersList: {},
  profileOrdersSelect: {
    marginBottom: theme.spacing.unit * 4
  },
  profileOrdersTitle: {
    marginBottom: theme.spacing.unit * 4
  }
});

@withStyles(styles, { withTheme: true })
@inject("uiStore")
@withOrders
@observer
class ProfileOrders extends Component {
  static propTypes = {
    classes: PropTypes.object,
    orders: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired
    })),
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    uiStore: PropTypes.shape({
      accountProfileOptions: PropTypes.shape({
        orderStatusQuery: PropTypes.string
      }),
      setAccountProfileOrderStatusQueryVariable: PropTypes.func
    }).isRequired
  };

  handleOrderStatusTypeChange = (event) => {
    this.props.uiStore.setAccountProfileOrderStatusQueryVariable(event.target.value);

    this.setState({ [event.target.name]: event.target.value });
  };

  renderOrderTypeSelect() {
    const { uiStore: { accountProfileOptions: { orderStatusQuery } } } = this.props;

    const orderStatusOptions = [
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
        value={orderStatusQuery}
        options={orderStatusOptions}
        inputProps={{
          name: "orderStatus",
          id: "order-status"
        }}
        onChange={this.handleOrderStatusTypeChange}
      />
    );
  }

  renderOrders() {
    const { orders } = this.props;

    // Use relayConnectionToArray to remove edges / nodes levels from orders object
    const ordersToArray = (orders && relayConnectionToArray(orders)) || [];

    return ordersToArray.map((order) => <OrderCard order={order} />);
  }

  render() {
    const { classes, orders, shop } = this.props;

    if (!orders) return <ErrorPage shop={shop} subtitle="No orders found" />;

    return (
      <Grid className={classes.profileOrdersContainer} container>
        <Grid className={classes.profileOrdersTitle} item xs={12} md={12}>
          <Typography variant="title">Orders</Typography>
        </Grid>
        <Grid className={classes.profileOrdersSelect} item xs={12} md={12}>
          {this.renderOrderTypeSelect()}
        </Grid>
        <Grid className={classes.profileOrdersList} item xs={12} md={12}>
          {this.renderOrders()}
        </Grid>
      </Grid>
    );
  }
}

export default ProfileOrders;

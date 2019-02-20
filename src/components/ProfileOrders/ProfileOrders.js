import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import OrderCard from "components/OrderCard";
import withOrders from "containers/order/withOrders";
import ErrorPage from "../../pages/_error";

@withOrders
@observer
class ProfileOrders extends Component {
  static propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired
    })),
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderOrders() {
    const { orders } = this.props;

    // Use relayConnectionToArray to remove edges / nodes levels from orders object
    const ordersToArray = (orders && relayConnectionToArray(orders)) || [];

    return ordersToArray.map((order) => <OrderCard order={order} />);
  }

  render() {
    const { orders, shop } = this.props;

    if (!orders) return <ErrorPage shop={shop} subtitle="No orders found" />;

    return (
      <Grid item xs={12} md={12}>
        <Typography variant="title">Orders</Typography>
        {this.renderOrders()}
      </Grid>
    );
  }
}

export default ProfileOrders;

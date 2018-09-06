import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import OrderFulfillmentGroup from "components/OrderFulfillmentGroup";

class OrderFulfillmentGroups extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  renderFulfillmentGroups() {
    const { cart } = this.props;

    if (cart.checkout && Array.isArray(cart.checkout.fulfillmentGroups)) {
      return cart.checkout.fulfillmentGroups.map((fulfillmentGroup) => (
        <OrderFulfillmentGroup
          cart={cart}
          fulfillmentGroup={fulfillmentGroup}
        />
      ));
    }

    return null;
  }

  render() {
    return (
      <aside>
        <Grid container spacing={24}>
          {this.renderFulfillmentGroups()}
        </Grid>
      </aside>
    );
  }
}

export default OrderFulfillmentGroups;

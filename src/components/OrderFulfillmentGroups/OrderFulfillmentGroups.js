import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import OrderFulfillmentGroup from "components/OrderFulfillmentGroup";

class OrderFulfillmentGroups extends Component {
  static propTypes = {
    classes: PropTypes.object,
    order: PropTypes.shape({
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object)
    }),
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  renderFulfillmentGroups() {
    const { order } = this.props;

    if (order && Array.isArray(order.fulfillmentGroups)) {
      return order.fulfillmentGroups.map((fulfillmentGroup, index) => (
        <OrderFulfillmentGroup
          key={index}
          fulfillmentGroup={fulfillmentGroup}
        />
      ));
    }

    return null;
  }

  render() {
    return (
      <Fragment>
        {this.renderFulfillmentGroups()}
      </Fragment>
    );
  }
}

export default OrderFulfillmentGroups;

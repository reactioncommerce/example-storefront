import React, { Component } from "react";
import PropTypes from "prop-types";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";

class OrderCardSummary extends Component {
  static propTypes = {
    classes: PropTypes.object,
    summary: PropTypes.shape({
      fulfillmentTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      itemTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      surchargeTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      taxTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      total: PropTypes.shape({
        displayAmount: PropTypes.string
      })
    })
  }

  render() {
    const { summary } = this.props;

    if (summary) {
      const {
        fulfillmentTotal,
        itemTotal,
        surchargeTotal,
        taxTotal,
        total
      } = summary;

      return (
        <CartSummary
          isDense
          displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
          displaySubtotal={itemTotal && itemTotal.displayAmount}
          displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
          displayTax={taxTotal && taxTotal.displayAmount}
          displayTotal={total && total.displayAmount}
        />
      );
    }

    return null;
  }
}

export default OrderCardSummary;

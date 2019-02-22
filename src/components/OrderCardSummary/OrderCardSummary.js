import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import styled from "styled-components";

// Use styled components to adjust the styling of the
// cart summary component to fit inside a bordered box
// TODO: EK - Get padding on order total
export const OrderCardSummaryContainer = styled.div`
  table td {
    font-size: 14px;
  }
  table td span {
    font-size: 18px;
  }
`;


const styles = (theme) => ({
  orderCardSummary: {}
});

@withStyles(styles)
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
    const { classes, summary } = this.props;

    if (summary) {
      const {
        fulfillmentTotal,
        itemTotal,
        surchargeTotal,
        taxTotal,
        total
      } = summary;

      return (
        <OrderCardSummaryContainer className={classes.orderCardSummary}>
          <CartSummary
            isDense
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
            displayTax={taxTotal && taxTotal.displayAmount}
            displayTotal={total && total.displayAmount}
          />
        </OrderCardSummaryContainer>
      );
    }

    return null;
  }
}

export default OrderCardSummary;

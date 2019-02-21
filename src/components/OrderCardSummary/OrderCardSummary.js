import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import styled from "styled-components";

// Use styled components to adjust the styling of the
// cart summary component to fit inside a bordered box
export const OrderCardSummaryContainer = styled.div`
  table td {
    font-size: 14px;
  }
  table td span {
    font-size: 18px;
  }
`;


const styles = (theme) => ({
  summary: {
  },
  header: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  title: {
    flex: "1 0 auto"
  },
  paymentMethod: {
    flex: "2 0 auto"
  },
  subtitle2: theme.typography.subtitle2
});

@withStyles(styles, { name: "SkOrderCardSummary" })
class OrderCardSummary extends Component {
  static propTypes = {
    classes: PropTypes.object,
    fulfillmentGroup: PropTypes.shape({
      summary: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    payments: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.shape({
        displayAmount: PropTypes.string.isRequired
      }),
      displayName: PropTypes.string.isRequired
    }))
  }

  renderSummary() {
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
        <OrderCardSummaryContainer>
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.summary}>
        {this.renderSummary()}
      </div>
    );
  }
}

export default OrderCardSummary;

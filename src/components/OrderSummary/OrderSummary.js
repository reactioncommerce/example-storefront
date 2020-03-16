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
export const OrderSummaryContainer = styled.div`
  table td {
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: none;
  }
`;

const styles = (theme) => ({
  summary: {
    border: theme.palette.borders.default
  },
  header: {
    padding: theme.spacing(1, 2)
  },
  title: {
    flex: "1 0 auto"
  },
  paymentMethod: {
    flex: "2 0 auto"
  },
  subtitle2: theme.typography.subtitle2
});

class OrderSummary extends Component {
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
    const { fulfillmentGroup } = this.props;

    if (fulfillmentGroup && fulfillmentGroup.summary) {
      const {
        fulfillmentTotal,
        itemTotal,
        surchargeTotal,
        taxTotal,
        total
      } = fulfillmentGroup.summary;

      return (
        <OrderSummaryContainer>
          <CartSummary
            isDense
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
            displayTax={taxTotal && taxTotal.displayAmount}
            displayTotal={total && total.displayAmount}
          />
        </OrderSummaryContainer>
      );
    }

    return null;
  }

  render() {
    const { classes, payments } = this.props;

    return (
      <div className={classes.summary}>
        <div className={classes.header}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography className={classes.subtitle2} variant="subtitle1">{"Payment Method"}</Typography>
            </Grid>
            <Grid item>
              {(payments || []).map((payment) => (
                <Typography key={payment._id} variant="body2">{payment.displayName} ({payment.amount.displayAmount})</Typography>
              ))}
            </Grid>
          </Grid>
        </div>
        <Divider />
        {this.renderSummary()}
      </div>
    );
  }
}

export default withStyles(styles)(OrderSummary);

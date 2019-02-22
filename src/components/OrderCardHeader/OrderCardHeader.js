import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { format } from "date-fns";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import Address from "@reactioncommerce/components/Address/v1";

const styles = (theme) => ({
  orderCardHeader: {},
  orderCardInfoSection: {
    marginBottom: theme.spacing.unit * 3
  },
  orderCardFulfillmentGroups: {
    marginBottom: theme.spacing.unit * 3
  },
  orderCardSummary: {
    borderTop: theme.palette.borders.default,
    paddingBottom: theme.spacing.unit,
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: theme.spacing.unit
  },

  fulfillmentGroups: {},
  flexContainer: {
    display: "flex",
    flexDirection: "column"
  },
  orderCard: {
    border: `solid 1px ${theme.palette.reaction.black10}`,
    borderRadius: "2px",
    marginBottom: theme.spacing.unit * 2.5
  },
  profileOrderHeader: {
    background: theme.palette.reaction.black02,
    padding: theme.spacing.unit * 2.5
  },

  expandedProfileOrderHeader: {
    borderTop: `solid 1px ${theme.palette.reaction.black10}`,
    marginTop: theme.spacing.unit * 2.5,
    paddingTop: theme.spacing.unit * 2.5
  },

  orderAddressText: {
    color: theme.palette.reaction.black65,
    fontSize: "14px"
  },
  orderCardInfoText: {
    color: theme.palette.reaction.coolGrey500
  },
  orderCardInfoTextDetails: {
    color: theme.palette.reaction.coolGrey500,
    textAlign: "right"
  },
  orderCardInfoTextBold: {
    color: theme.palette.reaction.coolGrey500,
    fontWeight: theme.typography.fontWeightBold
  },
  orderCardInfoHeader: {
    marginBottom: theme.spacing.unit * 1.5
  },


  // Order status buttons
  orderStatusNew: {
    backgroundColor: `${theme.palette.reaction.darkBlue300}`,
    color: "white",
    fontWeight: "800"
  },
  orderStatusCanceled: {
    backgroundColor: `${theme.palette.reaction.red300}`,
    color: "white",
    fontWeight: "800"
  },
  orderStatusProcessing: {
    backgroundColor: `${theme.palette.reaction.darkBlue300}`,
    color: "white",
    fontWeight: "800"
  },
  orderStatusShipped: {
    backgroundColor: `${theme.palette.reaction.reactionBlue}`,
    color: "white",
    fontWeight: "800"
  }
});

@withStyles(styles, { withTheme: true })
class OrderCardHeader extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoadingOrders: PropTypes.bool,
    order: PropTypes.shape({
      email: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired
    })
  };

  state = {
    isHeaderOpen: true // TODO: EK - change this to false when done with dev
  }

  toggleHeader = () => {
    this.setState({ isHeaderOpen: !this.state.isHeaderOpen });
  }

  renderOrderPayments() {
    const { order: { payments } } = this.props;

    // If more than one payment method, display amount for each
    if (Array.isArray(payments) && payments.length > 1) {
      return payments.map((payment) => <Typography variant="caption">{payment.displayName} {payment.amount.displayAmount}</Typography>);
    }

    // If only one payment method, do not display amount
    return payments.map((payment) => <Typography variant="caption">{payment.displayName}</Typography>);
  }

  renderOrderShipments() {
    const { order: { fulfillmentGroups } } = this.props;

    if (Array.isArray(fulfillmentGroups) && fulfillmentGroups.length) {
      return fulfillmentGroups.map((fulfillmentGroup) => <Typography variant="caption">{fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod.carrier} - {fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod.displayName}</Typography>); // eslint-disable-line
    }

    return null;
  }

  renderOrderStatus() {
    const { classes, order: { status } } = this.props;
    let classess;

    if (status.status === "coreOrderWorkflow/canceled") {
      classess = classes.orderStatusCanceled;
    }

    if (status.status === "new") {
      classess = classes.orderStatusNew;
    }

    if (status.status === "coreOrderWorkflow/processing") {
      classess = classes.orderStatusProcessing;
    }

    if (status.status === "coreOrderWorkflow/completed") {
      classess = classes.orderStatusShipped;
    }

    return <Chip label={status.label} className={classess} />;
  }

  render() {
    const { classes, order: { createdAt, fulfillmentGroups, payments, referenceId } } = this.props;
    const { shippingAddress } = fulfillmentGroups[0].data;
    const orderDate = format(
      createdAt,
      "MM/DD/YYYY"
    );

    return (
      <div className={classes.profileOrderHeader}>
        <Grid container>
          <Grid xs={12} md={3}>
            {this.renderOrderStatus()}
          </Grid>
          <Grid xs={12} md={3}>
            <Typography variant="caption" className={classes.orderCardInfoText}>Date:</Typography>
            <Typography variant="caption" className={classes.orderCardInfoTextBold}>{orderDate}</Typography>
          </Grid>
          <Grid xs={12} md={3}>
            <Typography variant="caption" className={classes.orderCardInfoText}>Order ID:</Typography>
            <Typography variant="caption" className={classes.orderCardInfoTextBold}>{referenceId}</Typography>
          </Grid>
          <Grid xs={12} md={3}>
            <Typography variant="caption" className={classes.orderCardInfoTextDetails}>
              Order details
              <IconButton color="inherit" onClick={this.toggleHeader}>
                {this.state.isHeaderOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
        {this.state.isHeaderOpen ?
          <section className={classes.expandedProfileOrderHeader}>
            <Grid container>
              <Grid xs={12} md={6}>
                <Grid className={classes.orderCardInfoSection} xs={12} md={12}>
                  <Typography
                    variant="caption"
                    className={classnames(classes.orderCardInfoTextBold, classes.orderCardInfoHeader)}
                  >
                    Payment Method{payments.length !== 1 ? "s" : null}:
                  </Typography>
                  {this.renderOrderPayments()}
                </Grid>
                <Grid className={classes.orderCardInfoSection} xs={12} md={12}>
                  <Typography
                    variant="caption"
                    className={classnames(classes.orderCardInfoTextBold, classes.orderCardInfoHeader)}
                  >
                    Shipping Method{fulfillmentGroups.length !== 1 ? "s" : null}:
                  </Typography>
                  {this.renderOrderShipments()}
                </Grid>
              </Grid>
              <Grid xs={12} md={6}>
                <Grid xs={12} md={12}>
                  <Typography
                    variant="caption"
                    className={classnames(classes.orderCardInfoTextBold, classes.orderCardInfoHeader)}
                  >
                    Shipping Address:
                  </Typography>
                  <Address address={shippingAddress} className={classes.orderAddressText} />
                </Grid>
              </Grid>
            </Grid>
          </section>
          : null }
      </div>
    );
  }
}

export default OrderCardHeader;

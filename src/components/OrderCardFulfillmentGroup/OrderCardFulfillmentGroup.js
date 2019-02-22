import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartItems from "components/CartItems";

const styles = (theme) => ({
  fulfillmentGroup: {
  },
  fulfillmentGroupDetails: {
    padding: theme.spacing.unit * 2
  },
  fulfillmentGroupCount: theme.typography.subtitle2,
  fulfillmentGroupHeader: {
    borderBottom: theme.palette.borders.default,
    borderTop: theme.palette.borders.default,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  fulfillmentGroupHeaderRightColumn: {
    textAlign: "right"
  },
  trackShipmentButton: {
    textTransform: "none"
  }
});

@withStyles(styles)
class OrderCardFulfillmentGroup extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currentGroupCount: PropTypes.number,
    fulfillmentGroup: PropTypes.shape({
      items: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object)
      }),
      data: PropTypes.shape({
        shippingAddress: PropTypes.object
      })
    }),
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    payments: PropTypes.arrayOf(PropTypes.object),
    totalGroupsCount: PropTypes.number
  }

  static defaultProps = {
    hasMoreCartItems: false,
    loadMoreCartItems() {},
    onChangeCartItemsQuantity() {},
    onRemoveCartItems() {}
  }

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  }

  handleRemoveItem = (_id) => {
    const { onRemoveCartItems } = this.props;

    onRemoveCartItems(_id);
  }

  renderItems() {
    const { classes, fulfillmentGroup } = this.props;

    if (fulfillmentGroup && Array.isArray(fulfillmentGroup.items.nodes)) {
      return (
        <Grid className={classes.fulfillmentGroupDetails} item xs={12} md={12}>
          <CartItems
            isMiniCart
            isReadOnly
            items={fulfillmentGroup.items.nodes}
          />
        </Grid>
      );
    }

    return null;
  }

  onTrackShipmentButtonClick() {
    // TODO: What do we do to track a shipment? Link to a specific provider website?
  }

  render() {
    const { classes, currentGroupCount, fulfillmentGroup, totalGroupsCount } = this.props;

    return (
      <Fragment>
        <section className={classes.fulfillmentGroup}>
          <header className={classes.fulfillmentGroupHeader}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={6}>
                <Typography className={classes.fulfillmentGroupCount} variant="subheading">Shipment {currentGroupCount} of {totalGroupsCount}</Typography>
              </Grid>
              <Grid item xs={6} className={classes.fulfillmentGroupHeaderRightColumn}>
                {fulfillmentGroup.tracking ?
                  <Button
                    className={classes.trackShipmentButton}
                    onClick={this.onTrackShipmentButtonClick}
                    size="small"
                    variant="outlined"
                  >
                    Track shipment
                  </Button>
                  :
                  <Button
                    className={classes.trackShipmentButton}
                    disabled
                    size="small"
                    variant="outlined"
                  >
                    No tracking available
                  </Button>
                }
              </Grid>
            </Grid>
          </header>
          {this.renderItems()}
        </section>
      </Fragment>
    );
  }
}

export default OrderCardFulfillmentGroup;

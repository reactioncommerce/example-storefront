import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartItems from "components/CartItems";

import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  trackShipmentButton: {
    textTransform: "none"
  },


  fulfillmentGroup: {
    // border: theme.palette.borders.default
  },
  fulfillmentDetails: {
    padding: theme.spacing.unit * 2
  },
  header: {
    borderBottom: theme.palette.borders.default,
    borderTop: theme.palette.borders.default,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  headerRightColumn: {
    textAlign: "right"
  },
  subtitle2: theme.typography.subtitle2
});

@withStyles(styles, { name: "SkOrderFulfillmentGroup" })
class OrderFulfillmentGroup extends Component {
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
    const { classes, fulfillmentGroup, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (fulfillmentGroup && Array.isArray(fulfillmentGroup.items.nodes)) {
      return (
        <div className={classes.fulfillmentDetails}>
          <Grid item xs={12}>
            <CartItems
              isMiniCart
              isReadOnly
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={fulfillmentGroup.items.nodes}
              onChangeCartItemQuantity={this.handleItemQuantityChange}
              onRemoveItemFromCart={this.handleRemoveItem}
            />
          </Grid>
        </div>
      );
    }

    return null;
  }

  onTrackShipmentButtonClick() {
    console.log("Track this shipment somehow.");
  }

  render() {
    const { classes, currentGroupCount, fulfillmentGroup, totalGroupsCount } = this.props;

    return (
      <Fragment>
        <section className={classes.fulfillmentGroup}>
          <header className={classes.header}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={6}>
                <Typography className={classes.subtitle2} variant="subheading">Shipment {currentGroupCount} of {totalGroupsCount}</Typography>
              </Grid>
              <Grid item xs={6} className={classes.headerRightColumn}>
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

export default OrderFulfillmentGroup;

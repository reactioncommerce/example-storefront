import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartItems from "components/CartItems";
import OrderSummary from "components/OrderSummary";

const styles = (theme) => ({
  fulfillmentGroup: {
    border: theme.palette.borders.default
  },
  fulfillmentDetails: {
    padding: theme.spacing.unit * 2
  },
  header: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  headerRightColumn: {
    textAlign: "right"
  },
  summary: {
    paddingTop: theme.spacing.unit * 2
  },
  subtitle2: theme.typography.subtitle2
});

@withStyles(styles, { name: "SkOrderFulfillmentGroup" })
class OrderFulfillmentGroup extends Component {
  static propTypes = {
    classes: PropTypes.object,
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
    payments: PropTypes.arrayOf(PropTypes.object)
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

  renderFulfillmentInfo() {
    const { classes, fulfillmentGroup } = this.props;

    if (fulfillmentGroup.data && fulfillmentGroup.data.shippingAddress) {
      const { data: { shippingAddress } } = fulfillmentGroup;
      const address = (
        <Typography variant="body2">
          {(shippingAddress.fullName) && (
            <span>
              {shippingAddress.fullName}
              <br />
            </span>
          )}
          {shippingAddress.address1}
          <br />
          {(shippingAddress.address2 && shippingAddress.address2 !== "") && (
            <span>
              {shippingAddress.address2} <br />
            </span>
          )}
          {shippingAddress.city}, {shippingAddress.region} {shippingAddress.postal} <br />
          {shippingAddress.country}
        </Typography>
      );

      return (
        <div className={classes.fulfillmentDetails}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography className={classes.subtitle2} variant="subtitle1">{"Shipping Address"}</Typography>
            </Grid>
            <Grid item xs={9}>
              {address}
            </Grid>
          </Grid>
        </div>
      );
    }

    return null;
  }

  render() {
    const { classes, fulfillmentGroup, payments } = this.props;
    const { fulfillmentMethod } = fulfillmentGroup.selectedFulfillmentOption;

    return (
      <Fragment>
        <section className={classes.fulfillmentGroup}>
          <header className={classes.header}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <Typography className={classes.subtitle2} variant="subtitle1">{fulfillmentMethod.displayName}</Typography>
              </Grid>
              <Grid item xs={6} className={classes.headerRightColumn}>
                <Typography variant="body2">{fulfillmentMethod.group}</Typography>
              </Grid>
            </Grid>
          </header>
          {this.renderItems()}
          {this.renderFulfillmentInfo()}
        </section>
        <section className={classes.summary}>
          <OrderSummary fulfillmentGroup={fulfillmentGroup} payments={payments} />
        </section>
      </Fragment>
    );
  }
}

export default OrderFulfillmentGroup;

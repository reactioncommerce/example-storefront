import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartItems from "components/CartItems";

const styles = (theme) => ({
  fulfillmentGroup: {
    border: theme.palette.borders.default
  },
  fulfillmentDetails: {
    padding: theme.spacing.unit * 2
  }
});

@withStyles(styles)
class OrderFulfillmentGroup extends Component {
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
    fulfillmentGroup: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
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
    const { cart, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (cart && Array.isArray(cart.items)) {
      return (
        <Grid item xs={12}>
          <CartItems
            isMiniCart
            isReadOnly
            hasMoreCartItems={hasMoreCartItems}
            onLoadMoreCartItems={loadMoreCartItems}
            items={cart.items}
            onChangeCartItemQuantity={this.handleItemQuantityChange}
            onRemoveItemFromCart={this.handleRemoveItem}
          />
        </Grid>
      );
    }

    return null;
  }

  renderFulfillmentInfo() {
    const { cart, classes, fulfillmentGroup } = this.props;

    if (cart && cart.checkout && cart.checkout.summary) {
      let address;

      if (fulfillmentGroup) {
        const { data: { shippingAddress } } = fulfillmentGroup;

        address = (
          <Typography variant="body2">
            {(shippingAddress.firstName || shippingAddress.lastName) && (
              <span>
                {shippingAddress.firstName} {shippingAddress.lastName}
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
      }

      return (
        <div className={classes.fulfillmentDetails}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography variant="subheading">{"Shipping Address"}</Typography>
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
    const { classes } = this.props;

    return (
      <section className={classes.fulfillmentGroup}>
        {this.renderItems()}
        {this.renderFulfillmentInfo()}
      </section>
    );
  }
}

export default OrderFulfillmentGroup;

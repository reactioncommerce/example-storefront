import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CheckoutActionComplete from "@reactioncommerce/components/CheckoutActionComplete/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import CartItems from "components/CartItems";

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
    const { cart, fulfillmentGroup } = this.props;

    if (cart && cart.checkout && cart.checkout.summary) {
      let address;

      if (cart.checkout && cart.checkout.fulfillmentGroup) {
        address = ShippingAddressCheckoutAction.renderComplete({ fulfillmentGroup });
      }

      return (
        <Grid item xs={12}>
          <CheckoutActionComplete
            content={address}
            label="Shipping Address"
          />
        </Grid>
      );
    }

    return null;
  }

  render() {
    return (
      <aside>
        <Grid container spacing={24}>
          {this.renderItems()}
          {this.renderFulfillmentInfo()}
        </Grid>
      </aside>
    );
  }
}

export default OrderFulfillmentGroup;

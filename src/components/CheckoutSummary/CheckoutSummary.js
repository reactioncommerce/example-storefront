import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";

@withCart
@inject("uiStore")
@observer
class CheckoutSummary extends Component {
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
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  }

  handleRemoveItem = (_id) => {
    const { onRemoveCartItems } = this.props;

    onRemoveCartItems(_id);
  }

  renderCartItems() {
    const { cart, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (cart && Array.isArray(cart.items)) {
      return (
        <CartItems
          isMiniCart
          hasMoreCartItems={hasMoreCartItems}
          onLoadMoreCartItems={loadMoreCartItems}
          items={cart.items}
          onChangeCartItemQuantity={this.handleItemQuantityChange}
          onRemoveItemFromCart={this.handleRemoveItem}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <aside>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.renderCartItems()}
          </Grid>
          <Grid item xs={12}>
            <CartSummary
              displayShipping="$10.99"
              displaySubtotal="$275.77"
              displayTotal="$286.10"
              itemsQuantity={3}
            />
          </Grid>
        </Grid>
      </aside>
    );
  }
}

export default CheckoutSummary;

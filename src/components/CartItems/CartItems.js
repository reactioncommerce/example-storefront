import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@reactioncommerce/components/Button/v1";
import CartItemsList from "@reactioncommerce/components/CartItems/v1";

const styles = (theme) => ({
  loadMore: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  cfXPgA: {
    paddingLeft: 0,
    paddingRight: 0
  }
});

@withStyles(styles, { name: "SkCartItems" })
class CartItems extends Component {
  static propTypes = {
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    isMiniCart: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      attributes: PropTypes.arrayOf(PropTypes.object),
      currencyQuantity: PropTypes.number,
      imageUrl: PropTypes.string,
      isLowInventoryQuantity: PropTypes.bool,
      price: PropTypes.shape({
        displayPrice: PropTypes.string,
        compareAtPrice: PropTypes.string
      }),
      productSlug: PropTypes.string,
      title: PropTypes.string,
      quantity: PropTypes.number
    })).isRequired,
    onChangeCartItemQuantity: PropTypes.func.isRequired,
    onLoadMoreCartItems: PropTypes.func,
    onRemoveItemFromCart: PropTypes.func.isRequired,
    productURLPath: PropTypes.string
  }

  static defaultProps = {
    onChangeCartItemQuantity() { },
    onRemoveItemFromCart() { }
  };

  handleItemQuantityChange = (quantity, _id) => {
    const { onChangeCartItemQuantity } = this.props;

    onChangeCartItemQuantity(quantity, _id);
  }

  handleRemoveItem = (_id) => {
    const { onRemoveItemFromCart } = this.props;

    onRemoveItemFromCart(_id);
  }

  render() {
    const {
      classes,
      items,
      isMiniCart,
      isReadOnly,
      hasMoreCartItems,
      onLoadMoreCartItems
    } = this.props;

    return (
      <Fragment>
        <CartItemsList
          isMiniCart={isMiniCart}
          isReadOnly={isReadOnly}
          items={items}
          onChangeCartItemQuantity={this.handleItemQuantityChange}
          onRemoveItemFromCart={this.handleRemoveItem}
          productURLPath="/product/"
        />
        {hasMoreCartItems &&
          <div className={classes.loadMore}>
            <Button
              isShortHeight={isMiniCart}
              isTextOnly
              onClick={onLoadMoreCartItems}
            >
              {"Load More"}
            </Button>
          </div>
        }
      </Fragment>
    );
  }
}

export default CartItems;

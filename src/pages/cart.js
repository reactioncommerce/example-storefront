import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import trackProductViewed from "lib/tracking/trackProductViewed";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import CartItems from "components/CartItems";
import Button from "@reactioncommerce/components/Button/v1";
import CartCheckoutButton from "@reactioncommerce/components/CartCheckoutButton/v1";
import Link from "components/Link";

const styles = () => ({
  customerSupportCopy: {
    paddingLeft: "1.8333rem !important",
    paddingRight: "1.8333rem !important"
  }
});

const items = [{
  _id: "123",
  attributes: [{ label: "vendor", value: "Patagonia" }, { label: "Color", value: "Red" }, { label: "Size", value: "Medium" }],
  currentQuantity: 3,
  imageUrl: "http://placehold.it",
  isLowInventoryQuantity: true,
  price: {
    displayPrice: "$20.00",
    compareAtPrice: "$45.00"
  },
  productSlug: "/product-slug",
  title: "A Great Product",
  quantity: 2
},
{
  _id: "456",
  attributes: [{ label: "vendor", value: "Nike" }, { label: "Color", value: "Black" }, { label: "Size", value: "10" }],
  currentQuantity: 500,
  imageUrl: "http://placehold.it",
  isLowInventoryQuantity: false,
  price: {
    displayPrice: "$78.00"
  },
  productSlug: "/product-slug",
  title: "Another Great Product",
  quantity: 1
}];

@trackProductViewed()
@withStyles(styles)
class CartPage extends Component {
  handleCheckOut = () => {
    // TODO: handle checkout flow.
  }

  handleItemQuantityChange = (quantity) => {
    // TODO: update mobx store
  }

  handleRemoveItem = (_id) => {
    // TODO: update mobx store
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.root}>
        <Typography variant="title" align="center">
          Shopping Cart
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <CartItems
              items={items}
              onChangeCartItemQuantity={this.handleItemQuantityChange}
              onRemoveItemFromCart={this.handleRemoveItem}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography component="div" variant="body1">
              <CartSummary
                displayShipping="$10.99"
                displaySubtotal="$275.77"
                displayTotal="$286.10"
                itemsQuantity={3}
              />
              <Link href="/checkout">
                <CartCheckoutButton
                  components={{ Button }}
                  isDisabled={false}
                  isFullWidth
                  onClick={this.handleCheckOut}
                />
              </Link>
            </Typography>
          </Grid>
          <Grid className={classes.customerSupportCopy} item xs={12}>
            <Typography paragraph variant="caption">
              Have questions? call 1.800.555.5555
            </Typography>
            <Typography paragraph variant="caption">
              <Link href="#">
                Shipping information
              </Link>
            </Typography>
            <Typography paragraph variant="caption">
              <Link href="#">
                Return policy
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default CartPage;

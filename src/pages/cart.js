import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import trackProductViewed from "lib/tracking/trackProductViewed";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import Button from "@reactioncommerce/components/Button/v1";
import CartCheckoutButton from "@reactioncommerce/components/CartCheckoutButton/v1";

const styles = () => ({
  root: {
  }
});

@trackProductViewed()
@withStyles(styles)
class CartPage extends Component {

  handleCheckOut = () => {
    // TODO: handle checkout flow.
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
            <h3>Cart Items</h3>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography component="div" variant="body1">
              <CartSummary
                displayShipping="$10.99"
                displaySubtotal="$275.77"
                displayTotal="$286.10"
                itemsQuantity={3}
              />
              <CartCheckoutButton
                components={{ Button }}
                isDisabled={false}
                isFullWidth
                onClick={this.handleCheckOut}
              />
            </Typography>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default CartPage;

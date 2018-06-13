import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import trackProductViewed from "lib/tracking/trackProductViewed";

const styles = (theme) => ({
  root: {
    display: "flex"
  }
});

@trackProductViewed()
@withStyles(styles)
class CartPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <h1>Shopping Cart</h1>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <h3>Cart Items</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>Cart Summary</h3>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default CartPage;

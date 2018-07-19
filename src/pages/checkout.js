import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";

const styles = ({
  shopLogo: {
    display: "flex",
    justifyContent: "center",
    padding: "1.5rem 0"
  }
});

@observer
@withStyles(styles)
class Checkout extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  render() {
    const { classes, shop } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <section>
          <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
          <div className={classes.shopLogo}>
            <ShopLogo shopName={shop.name} />
          </div>
          <Grid container spacing={24}>
            <Grid item xs={12} md={8}>
              <Typography>
                Checkout Action components Placeholder
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography>
                Checkout Cart Review placeholder
              </Typography>
            </Grid>
          </Grid>
        </section>
      </Fragment>
    );
  }
}

export default Checkout;

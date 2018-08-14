import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import CartIcon from "mdi-material-ui/Cart";
import LockIcon from "mdi-material-ui/Lock";
import Link from "components/Link";

const styles = (theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkoutTitleContainer: {
    alignSelf: "flex-end",
    width: "8rem",
    [theme.breakpoints.up("md")]: {
      width: "10rem"
    }
  },
  checkoutTitle: {
    fontSize: "1.125rem",
    color: theme.palette.reaction.black35,
    display: "inline",
    marginLeft: "0.3rem"
  },
  checkoutContentContainer: {
    display: "flex",
    justifyContent: "center"
  },
  checkoutContent: {
    flex: "1",
    maxWidth: theme.layout.mainContentMaxWidth,
    padding: "1rem"
  },
  logo: {
    color: theme.palette.reaction.reactionBlue,
    marginRight: theme.spacing.unit,
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  }
});

@observer
@withStyles(styles, { withTheme: true })
class Checkout extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  render() {
    const { classes, shop, theme } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Checkout</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
        <section className={classes.checkoutContentContainer}>
          <div className={classes.checkoutContent}>
            <div className={classes.headerContainer}>
              <Link route="home">
                <div className={classes.logo}>
                  <ShopLogo shopName={shop.name} />
                </div>
              </Link>
              <div className={classes.checkoutTitleContainer}>
                <LockIcon style={{ fontSize: 14, color: theme.palette.reaction.black35 }}/>
                <Typography className={classes.checkoutTitle}>
                    Checkout
                </Typography>
              </div>
              <Link route="cart">
                <CartIcon />
              </Link>
            </div>
            <Grid container spacing={24} >
              <Grid item xs={12} md={8}>
                <Typography paragraph>
                  <br /><br /><br />Checkout Action components Placeholder
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>
                  <br /><br /><br />Checkout Cart Review placeholder
                </Typography>
              </Grid>
            </Grid>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Checkout;

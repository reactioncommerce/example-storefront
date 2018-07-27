import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import trackProductViewed from "lib/tracking/trackProductViewed";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";

// TODO: Replace this mock product data with real data.
const items = [{
  _id: "123",
  attributes: [{ label: "Color", value: "Red" }, { label: "Size", value: "Medium" }],
  compareAtPrice: {
    displayAmount: "$45.00"
  },
  currentQuantity: 3,
  imageURLs: {
    small: "//placehold.it/150",
    thumbnail: "//placehold.it/150"
  },
  isLowQuantity: true,
  price: {
    displayAmount: "$20.00"
  },
  productSlug: "/product-slug",
  productVendor: "Patagonia",
  title: "Five Count",
  quantity: 2
},
{
  _id: "456",
  attributes: [{ label: "Color", value: "Black" }, { label: "Size", value: "10" }],
  currentQuantity: 500,
  imageURLs: {
    small: "//placehold.it/150",
    thumbnail: "//placehold.it/150"
  },
  isLowQuantity: false,
  price: {
    displayAmount: "$78.00"
  },
  productSlug: "/product-slug",
  productVendor: "Patagonia",
  title: "Ticket To Anywhere",
  quantity: 1
}];
// END TODO

const styles = (theme) => ({
  checkoutButtonsContainer: {
    backgroundColor: theme.palette.reaction.black02,
    padding: theme.spacing.unit * 2
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing.unit * 4}px !important`
  },
  phoneNumber: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: "1.6rem",
    marginBottom: "3.1rem"
  }
});

@trackProductViewed()
@inject("uiStore")
@observer
@withStyles(styles)
class CartPage extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  }

  handleCheckOut = () => {
    // TODO: handle checkout flow.
  }

  handleItemQuantityChange = (quantity) => quantity

  handleRemoveItem = (_id) => _id

  render() {
    const { classes, shop } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name} | Cart</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <section>
          <Typography className={classes.title} variant="title" align="center">
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
              <CartSummary
                displayShipping="$10.99"
                displaySubtotal="$275.77"
                displayTotal="$286.10"
                itemsQuantity={3}
              />
              <div className={classes.checkoutButtonsContainer}>
                <CheckoutButtons />
              </div>
            </Grid>
            <Grid className={classes.customerSupportCopy} item>
              <Typography paragraph variant="caption">
                Have questions? call <span className={classes.phoneNumber}>1.800.555.5555</span>
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
      </Fragment>
    );
  }
}

export default CartPage;

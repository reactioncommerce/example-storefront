import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Minus from "mdi-material-ui/Minus";
import Plus from "mdi-material-ui/Plus";
import { inject, observer } from "mobx-react";
import CartPopover from "components/CartPopover";
import Divider from "components/Divider";

// This is a temporary cartItem object to be used for testing
// pending the GraphQL endpoint being hooked up
// Remove the code between these comments when live data is available
const cartItem = {
  _id: "abcdefghijklmnop",
  attributes: [
    {
      label: "Color",
      value: "Red"
    },
    {
      label: "Season",
      value: "Summer"
    }
  ],
  currentQuantity: 10,
  imageUrl: "//placehold.it/100",
  isLowInventoryQuantity: false,
  price: {
    compareAtPrice: "19.99",
    displayPrice: "18.99"
  },
  productSlug: "product-slug",
  title: "Item Title",
  quantity: 10
};
// This is a temporary cartItem object to be used for testing
// pending the GraphQL endpoint being hooked up
// Remove the code between these comments when live data is available

const styles = (theme) => theme.ProductDetailAddToCart;


@withStyles(styles)
@inject("uiStore")
@observer
export default class ProductDetailAddToCart extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClick: PropTypes.func,
    uiStore: PropTypes.shape({
      closeCartPopover: PropTypes.func,
      openCartPopover: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    classes: {},
    onClick: () => {}
  };

  state = {
    addToCartQuantity: 1
  };

  handleOnClick = () => {
    const { onClick, uiStore } = this.props;

    // Pass chosen quantity to onClick callback
    onClick(this.state.addToCartQuantity);

    // Reset cart quantity to 1 after items are added to cart
    this.setState({ addToCartQuantity: 1 });

    // Open cart popover on addToCart
    uiStore.openCartPopover();

    // Close cart popover after 3 seconds
    setTimeout(() => {
      uiStore.closeCartPopover();
    }, 3000);
  }

  handleQuantityInputChange = (event) => {
    const { value } = event.target;

    const numericValue = Math.floor(Number(value));

    if (Number.isNaN(numericValue)) {
      return null;
    }

    return this.setState({ addToCartQuantity: numericValue });
  }

  handleIncrementButton = () => {
    const value = this.state.addToCartQuantity + 1;

    this.setState({ addToCartQuantity: value });
  }

  handleDecrementButton = () => {
    const value = this.state.addToCartQuantity - 1;

    if (value >= 1) {
      this.setState({ addToCartQuantity: value });
    }
  }

  render() {
    const {
      classes: {
        addToCartButton,
        addToCartText,
        incrementButton,
        quantityContainer,
        quantityGrid,
        quantityInput,
        quantityTypography
      }
    } = this.props;

    const { addToCartQuantity } = this.state;

    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12} className={quantityGrid}>
            <Divider />
            <Typography component="span" className={quantityTypography}>Quantity</Typography>
            <TextField
              id="addToCartQuantityInput"
              value={addToCartQuantity}
              onChange={this.handleQuantityInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <ButtonBase
                      color="default"
                      variant="outlined"
                      onClick={this.handleDecrementButton}
                      className={incrementButton}
                    >
                      <Minus />
                    </ButtonBase>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <ButtonBase
                      variant="outlined"
                      color="default"
                      onClick={this.handleIncrementButton}
                      className={incrementButton}
                    >
                      <Plus />
                    </ButtonBase>
                  </InputAdornment>
                ),
                disableUnderline: true,
                classes: {
                  root: quantityContainer,
                  input: quantityInput
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonBase
              onClick={this.handleOnClick}
              className={addToCartButton}
            >
              <Typography className={addToCartText} component="span" variant="body1">
                Add to cart
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
        <CartPopover cartItem={cartItem} />
      </Fragment>
    );
  }
}

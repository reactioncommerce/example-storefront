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

const styles = (theme) => ({
  addToCartButton: {
    "padding": theme.spacing.unit,
    "backgroundColor": theme.palette.primary.main,
    "borderRadius": theme.palette.reaction.buttonBorderRadius,
    "minWidth": "66%",
    "&:hover": {
      borderColor: theme.palette.reaction.activeElementBorderColor
    },
    "&:focus": {
      outline: "auto 5px -webkit-focus-ring-color"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  addToCartText: {
    color: theme.palette.primary.contrastText,
    fontWeight: 600
  },
  addToCartErrorText: {
    color: theme.palette.primary.coolGray500,
    fontWeight: 600,
    marginTop: "20px"
  },
  incrementButton: {
    backgroundColor: theme.palette.reaction.black02,
    color: theme.palette.reaction.coolGray500,
    fontSize: "12px",
    padding: 6
  },
  quantityContainer: {
    padding: 0,
    border: `1px solid ${theme.palette.reaction.black15}`,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.palette.reaction.buttonBorderRadius
  },
  quantityGrid: {
    marginBottom: theme.spacing.unit * 3
  },
  quantityInput: {
    "color": theme.palette.reaction.coolGray500,
    "fontSize": "12px",
    "width": "40px",
    "textAlign": "center",
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    },
    "borderLeft": `1px solid ${theme.palette.reaction.black15}`,
    "borderRight": `1px solid ${theme.palette.reaction.black15}`
  },
  quantitySvg: {
    fontSize: "18px"
  },
  quantityTypography: {
    color: theme.palette.reaction.coolGray500,
    marginBottom: theme.spacing.unit * 2
  }
});


@withStyles(styles, { name: "SkProductDetailAddToCart" })
@inject("uiStore")
@observer
export default class ProductDetailAddToCart extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClick: PropTypes.func,
    selectedOptionId: PropTypes.string,
    selectedVariantId: PropTypes.string,
    uiStore: PropTypes.shape({
      openCartWithTimeout: PropTypes.func
    }).isRequired,
    variants: PropTypes.array
  };

  static defaultProps = {
    classes: {},
    onClick: () => {}
  };

  state = {
    addToCartQuantity: 1
  };

  handleOnClick = async () => {
    const { onClick, uiStore } = this.props;

    // Pass chosen quantity to onClick callback
    await onClick(this.state.addToCartQuantity);

    // Scroll to the top
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }

    // Reset cart quantity to 1 after items are added to cart
    this.setState({
      addToCartError: null,
      addToCartQuantity: 1
    });

    // Open cart popper on addToCart
    uiStore.openCartWithTimeout();
  }

  handleQuantityInputChange = (event) => {
    const { value } = event.target;
    const numericValue = Math.floor(Number(value));
    const variant = this.getVariantToCheckAvailableToSellQuantity();
    const { canBackorder, inventoryAvailableToSell } = variant;

    if (Number.isNaN(numericValue)) {
      return null;
    }

    if (canBackorder === true) {
      return this.setState({
        addToCartError: null,
        addToCartQuantity: numericValue
      });
    }

    if (inventoryAvailableToSell && inventoryAvailableToSell >= value) {
      return this.setState({
        addToCartError: null,
        addToCartQuantity: numericValue
      });
    }

    return this.setState({ addToCartError: "Sorry, you are trying to add too many items to your cart." });
  }

  handleIncrementButton = () => {
    const value = this.state.addToCartQuantity + 1;
    const variant = this.getVariantToCheckAvailableToSellQuantity();
    const { canBackorder, inventoryAvailableToSell } = variant;

    if (canBackorder === true) {
      return this.setState({
        addToCartError: null,
        addToCartQuantity: value
      });
    }

    if (inventoryAvailableToSell && inventoryAvailableToSell >= value) {
      return this.setState({
        addToCartError: null,
        addToCartQuantity: value
      });
    }

    return this.setState({ addToCartError: "Sorry, you are trying to add too many items to your cart." });
  }

  handleDecrementButton = () => {
    const value = this.state.addToCartQuantity - 1;

    if (value >= 1) {
      this.setState({
        addToCartError: null,
        addToCartQuantity: value
      });
    }
  }


  getVariantToCheckAvailableToSellQuantity = () => {
    const { selectedOptionId, selectedVariantId, variants } = this.props;
    const selectedVariant = variants.find((variant) => variant._id === selectedVariantId);

    if (selectedOptionId) {
      // Check to make sure the selected option is from this current page, and not left over from a previous page
      const options = (selectedVariant && Array.isArray(selectedVariant.options) && selectedVariant.options.length) ? selectedVariant.options : null;

      if (options) {
        return options.find((option) => option._id === selectedOptionId);
      }
    }

    // If we don't have an option, use the variant for inventory status information
    if (selectedVariantId) {
      return selectedVariant;
    }

    // We should always have a selected option or variant, so we should never get this far
    return null;
  }

  render() {
    const {
      classes: {
        addToCartButton,
        addToCartText,
        addToCartErrorText,
        incrementButton,
        quantityContainer,
        quantityGrid,
        quantityInput,
        quantitySvg,
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
                      <Minus className={quantitySvg} />
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
                      <Plus className={quantitySvg} />
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
            <Typography className={addToCartErrorText} component="span" variant="body1">
              {this.state.addToCartError}
            </Typography>
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

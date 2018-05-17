import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import InputAdornment from "material-ui/Input/InputAdornment";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Minus from "mdi-material-ui/Minus";
import Plus from "mdi-material-ui/Plus";
import Divider from "components/Divider";

const styles = (theme) => ({
  quantityContainer: {
    padding: 0,
    border: `1px solid ${theme.palette.reaction.borderColor}`,
    backgroundColor: theme.palette.common.white,
    borderRadius: 2
  },
  quantityInput: {
    "width": "40px",
    "textAlign": "center",
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    },
    "borderLeft": `1px solid ${theme.palette.reaction.borderColor}`,
    "borderRight": `1px solid ${theme.palette.reaction.borderColor}`
  },
  incrementButton: {
    backgroundColor: theme.palette.reaction.activeElementBackground,
    padding: 6
  },
  optionButton: {
    "fontWeight": 600,
    "padding": theme.spacing.unit,
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.light,
    "color": theme.palette.primary.contrastText,
    "minWidth": 300,
    "&:hover": {
      borderColor: theme.palette.reaction.activeElementBorderColor
    },
    "&:focus": {
      outline: "auto 5px -webkit-focus-ring-color"
    }
  }
});


@withStyles(styles)
export default class ProductDetailOption extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    option: PropTypes.object,
    selectedOption: PropTypes.string
  }

  static propTypes = {
    classes: PropTypes.object,
    product: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    theme: {}
  };

  state = {
    addToCartQuantity: 0
  };

  handleOnClick = () => {
    console.log("This currently does nothing. When our GraphQL endpoints are available, we'll use them to add the items to the cart.");
    console.log(`This will add ${this.state.addToCartQuantity} items to the cart.`);
  }

  handleQuantityInputChange = (event) => {
    const { value } = event.target;

    this.setState({ addToCartQuantity: value });
  }

  handleIncrementButton = () => {
    const value = this.state.addToCartQuantity + 1;

    this.setState({ addToCartQuantity: value });
  }

  handleDecrementButton = () => {
    const value = this.state.addToCartQuantity - 1;

    if (value >= 0) {
      this.setState({ addToCartQuantity: value });
    }
  }

  render() {
    const {
      classes: { optionButton, optionText, quantityInput, quantityContainer, incrementButton }
    } = this.props;

    const { addToCartQuantity } = this.state;

    return (
      <Fragment>
        <Divider />
        <Typography component="span" className={status}>Quantity</Typography>
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
        <ButtonBase
          onClick={this.handleOnClick}
          className={optionButton}
          fullWidth={true}
        >
          <Typography className={optionText} component="span" variant="body1">
            Add to cart
          </Typography>
        </ButtonBase>
      </Fragment>
    );
  }
}

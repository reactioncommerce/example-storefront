import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";

class CartToggle extends Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    return (
      <IconButton color="inherit" onClick={this.props.onClick}>
        <CartIcon />
      </IconButton>
    );
  }
}

export default CartToggle;

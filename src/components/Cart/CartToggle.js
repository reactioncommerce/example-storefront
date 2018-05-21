import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import IconButton from "material-ui/IconButton";
import CartIcon from "mdi-material-ui/Cart";

@inject("uiStore")
class CartToggle extends Component {
  static propTypes = {
    uiStore: PropTypes.shape({
      toggleCartOpen: PropTypes.func
    }).isRequired
  };

  handleClick = () => {
    this.props.uiStore.toggleCartOpen();
  };

  render() {
    return (
      <IconButton color="inherit" onClick={this.handleClick}>
        <CartIcon />
      </IconButton>
    );
  }
}

export default CartToggle;

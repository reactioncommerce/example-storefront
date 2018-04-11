import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import IconButton from "material-ui/IconButton";
import CartIcon from "mdi-material-ui/Cart";

@inject("uiStore")
@observer
class CartToggle extends Component {
  static propTypes = {
    uiStore: PropTypes.object
  };

  static defaultProps = {
    uiStore: {}
  };

  render() {
    const { uiStore } = this.props;
    return (
      <IconButton color="inherit" onClick={uiStore.toggleCartOpen}>
        <CartIcon />
      </IconButton>
    );
  }
}

export default CartToggle;

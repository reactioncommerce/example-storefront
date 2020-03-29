import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const styles = () => ({
  cart: {
    width: "90vw"
  }
});

class Cart extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.shape({
      closeCart: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    classes: {}
  };

  handleClose = () => {
    this.props.uiStore.closeCart();
  };

  render() {
    const { classes, uiStore } = this.props;
    return (
      <Drawer anchor="right" open={uiStore.isCartOpen} onClose={this.handleClose}>
        <div className={classes.cart}>Cart Component</div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(inject("uiStore")(Cart));

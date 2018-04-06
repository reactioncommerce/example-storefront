import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import CartIcon from "mdi-material-ui/Cart";

import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";

const styles = () => ({
  title: {
    flex: 1
  },
  cart: {
    width: 320
  }
});

@withStyles(styles)
@inject("uiStore")
@observer
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.object
  }
  render() {
    const { classes, uiStore } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="title">Reaction Commerce</Typography>
          <IconButton onClick={uiStore.toggleCartOpen}>
            <CartIcon />
          </IconButton>
        </Toolbar>
        <Drawer anchor="right" open={uiStore.cartOpen} onClose={uiStore.toggleCartOpen}>
          <div className={classes.cart}>Cart</div>
        </Drawer>
      </AppBar>
    );
  }
}

export default Header;

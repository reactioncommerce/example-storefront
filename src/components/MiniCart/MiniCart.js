import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MiniCartComponent from "@reactioncommerce/components/MiniCart/v1";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import { Router } from "routes";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import withCart from "containers/cart/withCart";
import withShop from "containers/shop/withShop";

const components = {
  // TODO: Use QuantityInput component when MUI dependency is removed.
  QuantityInput: "div"
};

const checkout = {
  summary: {
    itemTotal: {
      displayAmount: "$25.00"
    },
    taxTotal: {
      displayAmount: "$2.50"
    }
  }
};


const styles = ({ palette, zIndex }) => ({
  popper: {
    marginTop: "0.5rem",
    marginRight: "1rem",
    zIndex: zIndex.modal
  },
  cart: {
    backgroundColor: palette.common.white
  }
});

const closePopper = {
  anchorElement: null,
  open: false
};

@withStyles(styles, { withTheme: true })
@withShop
@withCart
export default class MiniCart extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object.isRequired
  }

  state = {
    open: false,
    anchorElement: null,
    enteredPopper: false
  };

  handlePopperOpen = (event) => {
    const { currentTarget } = event;
    this.setState({
      anchorElement: currentTarget,
      open: true
    });
  }

  handlePopperClose = () => {
    const { enteredPopper } = this.state;

    setTimeout(() => {
      if (!enteredPopper) {
        this.setState(closePopper);
      }
    }, 500);
  }

  handleEnterPopper = () => {
    this.setState({ enteredPopper: true });
  }

  handleLeavePopper = () => {
    this.setState(closePopper);
  }

  handleClickAway = () => {
    this.setState(closePopper);
  }

  handleOnClick = () => {
    this.setState(closePopper, () => Router.pushRoute("cart"));
  }

  render() {
    const { classes, cart } = this.props;
    const { anchorElement, open } = this.state;
    const id = open ? "simple-popper" : null;

    return (
      <Fragment>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <IconButton color="inherit"
            onMouseEnter={this.handlePopperOpen}
            onMouseLeave={this.handlePopperClose}
            onClick={this.handleOnClick}
          >
            <CartIcon />
          </IconButton>
        </ClickAwayListener>

        <Popper
          className={classes.popper}
          id={id}
          open={open}
          anchorEl={anchorElement}
          transition
          onMouseEnter={this.handleEnterPopper}
          onMouseLeave={this.handleLeavePopper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.cart}>
                <MiniCartComponent cart={{ ...cart, checkout }} components={components} />
              </div>
            </Fade>
          )}
        </Popper>
      </Fragment>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckoutButtons from "components/CheckoutButtons";


const styles = (theme) => ({
  container: {
    "alignItems": "center",
    "backgroundColor": theme.palette.reaction.white,
    "boxShadow": theme.boxShadow.depth2,
    "display": "flex",
    "marginLeft": "auto",
    "marginRight": "auto",
    "maxWidth": "400px",
    "paddingTop": "12px",
    "position": "fixed",
    "right": 0,
    "top": 0,
    "transitionDuration": "400ms",
    "transitionProperty": "transform",
    "transitionTimingFunction": "linear",
    "zIndex": theme.zIndex.appBar + 1,
    "&:hover": {
      transform: "translate(0px, 0px)"
    }
  },
  gridContainer: {
    padding: "10px"
  },
  isContainerHidden: {
    transform: "translate(400px, 0px)"
  },
  isContainerVisible: {
    transform: "translate(0px, 0px)"
  },
  containerItem: {
    alignItems: "center",
    display: "flex"
  },
  addedToCartImg: {
    height: "40px",
    marginRight: "10px",
    width: "40px"
  },
  addedToCartItemName: {
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: theme.typography.fontWeightMedium,
    display: "inline-block",
    lineHeight: "0.8em"
  },
  addedToCartText: {
    color: theme.palette.primary.dark,
    display: "inline",
    fontSize: theme.typography.fontSize * 0.875
  }
});

class CartPopover extends Component {
  static propTypes = {
    /**
     * CartItem data
     */
    cartItem: PropTypes.shape({
      /**
       * The cart item ID
       */
      _id: PropTypes.string,
      /**
       * Array of additional attributes of the chosen item.
       */
      attributes: PropTypes.arrayOf(PropTypes.shape({
        /**
           * Attribute label (i.e. "Color").
           */
        label: PropTypes.string,
        /**
           *  Attribute value (i.e. "Red").
           */
        value: PropTypes.string
      })),
      /**
       * Image url of chosen item
       */
      imageUrl: PropTypes.string,
      /**
       * Is the chosen item have a low quantity
       */
      isLowInventoryQuantity: PropTypes.bool,
      /**
       * Price object of chosen item
       */
      price: PropTypes.shape({
        /**
         * Chosen items compare at price
         */
        compareAtPrice: PropTypes.string,
        /**
         * Chosen items display price
         */
        displayPrice: PropTypes.string
      }),
      /**
       * Chosen items slug
       */
      productSlug: PropTypes.string,
      /**
       * Chosen items title
       */
      title: PropTypes.string,
      /**
       * Quantity of chosen item in cart
       */
      quantity: PropTypes.number
    }),
    classes: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.shape({
      isCartPopoverOpen: PropTypes.bool
    }).isRequired
  }

  handleOnClick = () => {
    // This will need to pass the correct function and data into the Checkout Buttons
  }

  render() {
    const {
      cartItem,
      classes: {
        addedToCartImg,
        addedToCartItemName,
        addedToCartText,
        container,
        containerItem,
        gridContainer,
        isContainerHidden,
        isContainerVisible
      },
      uiStore
    } = this.props;

    if (cartItem) {
      return (
        <Hidden mdUp implementation="css">
          <div className={classNames(container, { [isContainerHidden]: !uiStore.isCartPopoverOpen, [isContainerVisible]: uiStore.isCartPopoverOpen })}>
            <Grid container className={gridContainer} spacing={3}>
              <Grid className={containerItem} item xs={12}>
                <img alt={cartItem.title} className={addedToCartImg} src={cartItem.imageUrl} />
                <Typography className={addedToCartText} component="span">
                  {cartItem.quantity} "<span className={addedToCartItemName}>{cartItem.title}</span>" added to cart
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CheckoutButtons
                  onClick={this.handleOnClick}
                />
              </Grid>
            </Grid>
          </div>
        </Hidden>
      );
    }

    return null;
  }
}

export default withStyles(styles)(inject("uiStore")(CartPopover));

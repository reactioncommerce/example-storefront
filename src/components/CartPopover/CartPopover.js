import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckoutButtons from "components/CheckoutButtons";


const styles = (theme) => ({
  container: {
    "alignItems": "center",
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
    "backgroundColor": theme.palette.reaction.white,
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

@withStyles(styles, { withTheme: true })
@inject("uiStore")
@observer
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
       * Current stock quantity of item
       */
      currentQuantity: PropTypes.number,
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
    }).isRequired,
    classes: PropTypes.object,
    isVisible: PropTypes.bool,
    theme: PropTypes.object,
    uiStore: PropTypes.shape({
      isCartPopoverOpen: PropTypes.bool
    }).isRequired
  }

  handleOnClick = () => {
    console.log("go to checkout");
  }

  render() {
    // When cartItem is available as a prop, remove the following lines, and uncomment the prop destructuring below.
    // For now, we are using the static object `cartItem`.
    const { classes: { addedToCartImg, addedToCartItemName, addedToCartText, container, containerItem, gridContainer, isContainerHidden, isContainerVisible }, theme, uiStore } = this.props;
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
      imageUrl: "http://localhost:3000/assets/files/Media/nbYKLrZST5DSF87md/thumbnail/chuttersnap-265339-unsplash.png",
      isLowInventoryQuantity: false,
      price: {
        compareAtPrice: "19.99",
        displayPrice: "18.99"
      },
      productSlug: "product-slug",
      title: "Item Title",
      quantity: 10
    };
    // Remove the above lines, and uncomment line below when `cartItem` is available as a prop
    // const { cartItem, classes: { addedToCartImg, addedToCartItemName, addedToCartText, container, containerItem, gridContainer, isContainerHidden, isContainerVisible }, theme, uiStore } = this.props;

    return (
      <Hidden mdUp>
        <div className={classNames(container, { [isContainerHidden]: !uiStore.isCartPopoverOpen, [isContainerVisible]: uiStore.isCartPopoverOpen })}>
          <Grid container className={gridContainer} spacing={theme.spacing.unit * 3}>
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
}

export default CartPopover;

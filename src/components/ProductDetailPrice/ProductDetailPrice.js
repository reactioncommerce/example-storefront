import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  root: {}, // Available for custom styling needs
  compact: {
    display: "flex",
    alignItems: "center"
  },
  priceInline: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightMedium
  },
  compareAtPriceInline: {
    display: "inline-block",
    paddingLeft: "0.5rem"
  },
  strike: {
    textDecoration: "line-through"
  }
});

/**
 * Product detail basic info fields
 * @class ProductDetailTitle
 */
class ProductDetailPrice extends Component {
  static propTypes = {
    /**
     * CSS class name applied to the root element
     */
    className: PropTypes.string,

    /**
     * CSS classes
     */
    classes: PropTypes.object,

    /**
     * Sale or adjusted price.
     * If defined, the priceRange will be crossed out
     */
    compareAtPrice: PropTypes.string,

    /**
     * Use the compact layout
     */
    isCompact: PropTypes.bool,

    /**
     * Price or price range as a string
     */
    price: PropTypes.string
  }

  static defaultProps = {
    isCompact: false
  }

  render() {
    const { classes, className, compareAtPrice, price, isCompact } = this.props;

    // If all props are undefined then skip rendering component
    if (!price) return null;

    if (isCompact) {
      return (
        <Grid className={classnames(classes.root, classes.compact, className)} item sm={12}>
          <Typography className={classes.priceInline} component="span" variant="body1">{price}</Typography>
          <Typography className={classnames(classes.strike, classes.inline, classes.compareAtPriceInline)} variant="caption">{compareAtPrice}</Typography>
        </Grid>
      );
    }

    return (
      <Grid className={classnames(classes.root, className)} item sm={12}>
        <Typography className={classes.strike} variant="caption">{compareAtPrice}</Typography>
        <Typography component="div" variant="h6">{price}</Typography>
      </Grid>
    );
  }
}

export default withStyles(styles)(ProductDetailPrice);

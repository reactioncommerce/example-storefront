import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  price: {
    display: "block"
  }
});

@withStyles(styles)
export default class Price extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    displayCompareAtPrice: PropTypes.string,
    displayPrice: PropTypes.string
  }

  renderCompareAtPrice = () => {
    const { classes, displayCompareAtPrice, displayPrice } = this.props;

    // convert to number to determine if there is a difference
    // between displayCompareAtPrice and displayPrice.
    // Display prices will be prefixed with a currency symbol,
    // remove it before performing calculation.
    const diff = parseFloat(displayCompareAtPrice.slice(1)) - parseFloat(displayPrice.slice(1));

    // If there is no price difference, don't render compare at price.
    if (diff <= 0.00) return null;

    return (
      <del className={classes.price}>
        <Typography variant="body1">
          {displayCompareAtPrice}
        </Typography>
      </del>
    );
  }

  render() {
    const { classes, displayPrice } = this.props;

    return (
      <div>
        <span className={classes.price}>
          <Typography variant="body1">
            {displayPrice}
          </Typography>
        </span>
        {this.renderCompareAtPrice()}
      </div>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Chip from "material-ui/Chip";
import Typography from "material-ui/Typography";

const styles = (theme) => ({
  root: {},
  productInfo: {
    display: "flex",
    justifyContent: "space-between"
  },
  productMedia: {
    position: "relative"
  },
  chip: {
    borderRadius: 4,
    fontSize: 12,
    height: "auto",
    padding: theme.spacing.unit * 0.5,
    position: "absolute"
  },
  chipLabel: {
    fontWeight: theme.typography.fontWeightBold,
    padding: 0
  },
  status: {
    color: theme.palette.primary.contrastText,
    left: theme.spacing.unit,
    top: theme.spacing.unit
  },
  statusSoldOut: {
    backgroundColor: theme.palette.secondary.main
  },
  statusBackorder: {
    backgroundColor: theme.palette.secondary.dark
  },
  statusSale: {
    backgroundColor: theme.palette.error.main
  },
  statusBestseller: {
    backgroundColor: theme.palette.primary.light
  },
  warning: {
    backgroundColor: "transparent",
    ...theme.typography.caption,
    right: theme.spacing.unit,
    top: theme.spacing.unit
  },
  img: {
    height: "auto",
    width: "100%"
  }
});

@withStyles(styles)
class ProductItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    product: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    product: {}
  };

  get productStatus() {
    const { classes, product: { isBackorder, isSoldOut } } = this.props;
    let status;
    if (isSoldOut && isBackorder) {
      status = { label: "Backorder", style: `${classes.status} ${classes.statusBackorder}` };
    } else if (isSoldOut && !isBackorder) {
      status = { label: "Sold Out", style: `${classes.status} ${classes.statusSoldOut}` };
    }
    return status;
  }

  get productLowQuantity() {
    const { product: { isLowQuantity, isSoldOut } } = this.props;
    return isLowQuantity && !isSoldOut;
  }

  renderProductMedia() {
    const { classes, product: { description } } = this.props;
    const chipClasses = { root: classes.chip, label: classes.chipLabel };
    const { label, style } = this.productStatus || {};
    return (
      <div className={classes.productMedia}>
        {this.productStatus && <Chip label={label} classes={chipClasses} className={style} />}
        {this.productLowQuantity && <Chip label={"Low Inventory"} classes={chipClasses} className={classes.warning} />}
        <img className={classes.img} src="http://via.placeholder.com/200" alt={description} />
      </div>
    );
  }

  renderProductInfo() {
    const { classes, product: { price, title, vendor } } = this.props;
    const { range: priceRange } = price || {};
    return (
      <div className={classes.productInfo}>
        <div>
          <Typography variant="body2">{title}</Typography>
          <Typography variant="body1">{vendor}</Typography>
        </div>

        <div>
          <Typography variant="body2">${priceRange || price}</Typography>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderProductMedia()}
        {this.renderProductInfo()}
      </div>
    );
  }
}

export default ProductItem;

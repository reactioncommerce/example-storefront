import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "material-ui/styles";
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
    ...theme.typography.caption,
    borderRadius: 4,
    height: "auto",
    fontSize: 12,
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 0.5,
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
    right: theme.spacing.unit,
    top: theme.spacing.unit
  },
  img: {
    height: "auto",
    width: "100%"
  }
});

@withStyles(styles)
@withTheme()
class ProductItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    product: PropTypes.object,
    theme: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    product: {},
    theme: {}
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

  renderProductImage() {
    const { classes: { img }, product: { description, weight }, theme: { breakpoints: { values } } } = this.props;
    // TODO: random number for temp images, REMOVE ONCE WE HAVE REAL DATA
    const tempRandNum = Math.floor(Math.random() * 100 + 0);
    const tempImgs = {
      0: {
        xs: `https://picsum.photos/400?image=${tempRandNum}&gravity=center`,
        sm: `https://picsum.photos/300?image=${tempRandNum}&gravity=center`,
        md: `https://picsum.photos/400?image=${tempRandNum}&&gravity=center`,
        lg: `https://picsum.photos/800?image=${tempRandNum}&gravity=center`
      },
      1: {
        xs: `https://picsum.photos/400?image=${tempRandNum}&gravity=center`,
        sm: `https://picsum.photos/600/285?image=${tempRandNum}&gravity=center`,
        md: `https://picsum.photos/700/332?image=${tempRandNum}&&gravity=center`,
        lg: `https://picsum.photos/1600/783?image=${tempRandNum}&gravity=center`
      },
      2: {
        xs: `https://picsum.photos/400?image=${tempRandNum}&gravity=center`,
        sm: `https://picsum.photos/800/300?image=${tempRandNum}&gravity=center`,
        md: `https://picsum.photos/1000/312?image=${tempRandNum}&&gravity=center`,
        lg: `https://picsum.photos/1600/512?image=${tempRandNum}&gravity=center`
      }
    };
    return (
      <picture>
        <source srcSet={tempImgs[weight].lg} media={`(min-width: ${values.lg}px)`} />
        <source srcSet={tempImgs[weight].md} media={`(min-width: ${values.md}px)`} />
        <source srcSet={tempImgs[weight].sm} media={`(min-width: ${values.sm}px)`} />
        <img className={img} src={tempImgs[weight].xs} alt={description} />
      </picture>
    );
  }

  renderProductMedia() {
    const { classes } = this.props;
    const chipClasses = { root: classes.chip, label: classes.chipLabel };
    const { label, style } = this.productStatus || {};
    return (
      <div className={classes.productMedia}>
        {this.productStatus && <Chip label={label} classes={chipClasses} className={style} />}
        {this.productLowQuantity && <Chip label={"Low Inventory"} classes={chipClasses} className={classes.warning} />}
        {this.renderProductImage()}
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
          <Typography variant="body1">${priceRange || price}</Typography>
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

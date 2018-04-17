import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withStyles, withTheme } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import Chip from "material-ui/Chip";
import Fade from "material-ui/transitions/Fade";
import Hidden from "material-ui/Hidden";
import Typography from "material-ui/Typography";
import LoadingIcon from "mdi-material-ui/Loading";

// TODO: random number for temp images, REMOVE ONCE WE HAVE REAL DATA
const tempRandNum = 15;
const tempImgs = {
  0: {
    xs: "http://via.placeholder.com/400/E6E6E6/999999?text=FPO",
    sm: "http://via.placeholder.com/300/E6E6E6/999999?text=FPO",
    md: "http://via.placeholder.com/400/E6E6E6/999999?text=FPO",
    lg: "http://via.placeholder.com/800/E6E6E6/999999?text=FPO"
  },
  1: {
    xs: "http://via.placeholder.com/400/E6E6E6/999999?text=FPO",
    sm: "http://via.placeholder.com/600x285/E6E6E6/999999?text=FPO",
    md: "http://via.placeholder.com/700x332/E6E6E6/999999?text=FPO",
    lg: "http://via.placeholder.com/1600x780/E6E6E6/999999?text=FPO"
  },
  2: {
    xs: "http://via.placeholder.com/400/E6E6E6/999999?text=FPO",
    sm: "http://via.placeholder.com/800x248/E6E6E6/999999?text=FPO",
    md: "http://via.placeholder.com/1000x312/E6E6E6/999999?text=FPO",
    lg: "http://via.placeholder.com/1600x512/E6E6E6/999999?text=FPO"
  }
};

const styles = (theme) => ({
  [`@keyframes spin`]: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(-360deg)" }
  },
  root: {},
  productInfo: {
    display: "flex",
    justifyContent: "space-between"
  },
  productMedia: {
    backgroundColor: theme.palette.primary.contrastText,
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
    position: "absolute",
    zIndex: 100
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
  },
  imgLoading: {
    alignItems: "center",
    backgroundColor: "transparent",
    display: "flex",
    fontSize: 48,
    height: 100,
    justifyContent: "center",
    left: "calc(50% - 50px)",
    position: "absolute",
    top: "calc(50% - 50px)",
    width: 100
  },
  loadingIcon: {
    color: theme.palette.primary.light,
    fontSize: "inherit",
    animationName: "spin",
    animationDuration: theme.transitions.duration.standard * 2,
    animationTimingFunction: theme.transitions.easing.sharp,
    animationIterationCount: "infinite",
    animationFillMode: "both"
  },
  link: {
    ...theme.typography.body2,
    textAlign: "left",
    "&:hover": {
      color: theme.palette.secondary.main
    }
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

  state = { hasImageLoaded: false };

  get productDetailHref() {
    const { product: { handle } } = this.props;
    const url = `/product/${handle}`;
    return { pathname: url };
  }

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

  onImageLoad = () => {
    const { hasImageLoaded } = this.state;
    if (hasImageLoaded) return;
    this.setState({ hasImageLoaded: true });
  };

  renderProductImage() {
    const {
      classes: { img, imgLoading, loadingIcon },
      product: { description, weight },
      theme: { breakpoints: { values } }
    } = this.props;
    const { hasImageLoaded } = this.state;

    const picture = (
      <picture>
        <source srcSet={tempImgs[weight].lg} media={`(min-width: ${values.lg}px)`} />
        <source srcSet={tempImgs[weight].md} media={`(min-width: ${values.md}px)`} />
        <source srcSet={tempImgs[weight].sm} media={`(min-width: ${values.sm}px)`} />
        <img
          className={img}
          src={tempImgs[weight].xs}
          alt={description}
          onLoad={this.onImageLoad}
          ref={(image) => {
            if (image && image.complete) this.onImageLoad();
            return;
          }}
        />
      </picture>
    );

    const loading = (
      <div className={imgLoading}>
        <LoadingIcon className={loadingIcon} />
      </div>
    );

    return (
      <Fragment>
        <Fade in={hasImageLoaded}>{picture}</Fade>
        <Hidden xsUp={hasImageLoaded}>{loading}</Hidden>
      </Fragment>
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
          <Typography variant="body2">
            <Link href={this.productDetailHref}>
              <ButtonBase classes={{ root: classes.link }}>{title}</ButtonBase>
            </Link>
          </Typography>
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
        <Link href={this.productDetailHref}>
          <a>{this.renderProductMedia()}</a>
        </Link>
        {this.renderProductInfo()}
      </div>
    );
  }
}

export default ProductItem;

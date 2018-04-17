import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import Chip from "material-ui/Chip";
import Fade from "material-ui/transitions/Fade";
import Hidden from "material-ui/Hidden";
import Typography from "material-ui/Typography";
import LoadingIcon from "mdi-material-ui/Loading";

import { Link } from "routes";
import { styles } from "./styles";

// TODO: random number for temp images, REMOVE ONCE WE HAVE REAL DATA
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
    product: {
      weight: 0 // TODO: revisit this once real data is connected, only being used so render test pass
    },
    theme: {}
  };

  state = { hasImageLoaded: false };

  get productDetailHref() {
    const { product: { handle } } = this.props;
    const url = `/product/${handle}`;
    return url;
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
          ref={image => {
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
            <Link route={this.productDetailHref}>
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
        <Link route={this.productDetailHref}>
          <a>{this.renderProductMedia()}</a>
        </Link>
        {this.renderProductInfo()}
      </div>
    );
  }
}

export default ProductItem;

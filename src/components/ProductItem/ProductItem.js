import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "material-ui/styles";
import Chip from "material-ui/Chip";
import Fade from "material-ui/transitions/Fade";
import Hidden from "material-ui/Hidden";
import Typography from "material-ui/Typography";
import LoadingIcon from "mdi-material-ui/Loading";
import getConfig from "next/config";

import Link from "components/Link";
import { styles } from "./styles";

const { publicRuntimeConfig: { externalAssetsUrl } } = getConfig();

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
    theme: {}
  };

  state = { hasImageLoaded: false };

  get productDetailHref() {
    const { product: { slug } } = this.props;
    const url = `/product/${slug}`;
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

  buildImgUrl(imgPath) {
    return `${externalAssetsUrl}${imgPath}`;
  }

  renderProductImage() {
    const {
      classes: { img, imgLoading, loadingIcon },
      product: { description, primaryImage: { URLs } },
      theme: { breakpoints: { values } }
    } = this.props;
    const { hasImageLoaded } = this.state;

    const picture = (
      <picture>
        <source srcSet={this.buildImgUrl(URLs.small)} media={`(min-width: ${values.sm}px)`} />
        <source srcSet={this.buildImgUrl(URLs.medium)} media={`(min-width: ${values.md}px)`} />
        <source srcSet={this.buildImgUrl(URLs.large)} media={`(min-width: ${values.lg}px)`} />
        <img
          className={img}
          src={this.buildImgUrl(URLs.small)}
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
      <div >
        <div className={classes.productInfo}>
          <Typography variant="body2">
            {title}
          </Typography>
          <Typography variant="body1">${priceRange || price}</Typography>
        </div>
        <div>
          <Typography variant="body1">{vendor}</Typography>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Link route={this.productDetailHref}>
          {this.renderProductMedia()}
          {this.renderProductInfo()}
        </Link>
      </div>
    );
  }
}

export default ProductItem;

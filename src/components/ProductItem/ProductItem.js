import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { inject, observer } from "mobx-react";
import Chip from "material-ui/Chip";
import Fade from "material-ui/transitions/Fade";
import Hidden from "material-ui/Hidden";
import Typography from "material-ui/Typography";
import LoadingIcon from "mdi-material-ui/Loading";
import Link from "components/Link";
import Badge from "components/Badge";
import { styles } from "./styles";

const PRODUCT_PLACE_HOLDER = "/resources/placeholder.gif";

@withStyles(styles, { withTheme: true })
@inject("uiStore")
@observer
class ProductItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    product: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.object
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
    const { product: { isBackorder, isSoldOut } } = this.props;
    let status;
    if (isSoldOut && isBackorder) {
      status = { type: "backorder", label: "Backorder" };
    } else if (isSoldOut && !isBackorder) {
      status = { type: "sold_out", label: "Sold Out" };
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
    const { uiStore: { appConfig: { publicRuntimeConfig } } } = this.props;
    return `${publicRuntimeConfig.externalAssetsUrl}${imgPath}`;
  }

  renderProductImage() {
    const {
      classes: { img, imgLoading, loadingIcon },
      theme: { breakpoints: { values } }
    } = this.props;
    const { hasImageLoaded } = this.state;
    let { product: { primaryImage } } = this.props;

    if (!primaryImage) {
      primaryImage = {
        URLs: {
          small: PRODUCT_PLACE_HOLDER,
          medium: PRODUCT_PLACE_HOLDER,
          large: PRODUCT_PLACE_HOLDER
        }
      };
    }

    const picture = (
      <picture>
        <source srcSet={this.buildImgUrl(primaryImage.URLs.small)} media={`(min-width: ${values.sm}px)`} />
        <source srcSet={this.buildImgUrl(primaryImage.URLs.medium)} media={`(min-width: ${values.md}px)`} />
        <source srcSet={this.buildImgUrl(primaryImage.URLs.large)} media={`(min-width: ${values.lg}px)`} />
        <img
          className={img}
          src={this.buildImgUrl(primaryImage.URLs.small)}
          alt=""
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

  renderBadge() {

  }

  renderProductMedia() {
    const { classes } = this.props;
    const { type, label } = this.productStatus || {};
    return (
      <div className={classes.productMedia}>
        {this.productStatus && <Badge type={type} label={label} />}
        {this.productLowQuantity && <Badge type={"low_inventory"} label="Low Inventory" />}
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
          <Typography variant="body1">${priceRange}</Typography>
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

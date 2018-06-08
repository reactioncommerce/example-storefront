import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import Fade from "@material-ui/core/Fade";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import LoadingIcon from "mdi-material-ui/Loading";
import Link from "components/Link";
import BadgeOverlay from "components/BadgeOverlay";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import { styles } from "./styles";

@withStyles(styles, { withTheme: true })
@inject("uiStore")
@observer
class ProductItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    product: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.object.isRequired
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
      theme: {
        breakpoints: { values }
      },
      uiStore
    } = this.props;
    const { publicRuntimeConfig } = uiStore.appConfig;
    const { hasImageLoaded } = this.state;
    let { product: { primaryImage } } = this.props;

    if (!primaryImage) {
      primaryImage = {
        URLs: {
          small: publicRuntimeConfig.placeholderImageUrls.productGrid,
          medium: publicRuntimeConfig.placeholderImageUrls.productGrid,
          large: publicRuntimeConfig.placeholderImageUrls.productGrid
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

  renderProductMedia() {
    const { classes } = this.props;

    return (
      <div className={classes.productMedia}>
        {this.renderProductImage()}
      </div>
    );
  }

  renderProductInfo() {
    const { classes, currencyCode, product: { pricing, title, vendor } } = this.props;
    const productPrice = priceByCurrencyCode(currencyCode, pricing);

    return (
      <div >
        <div className={classes.productInfo}>
          <Typography variant="body2">
            {title}
          </Typography>
          <Typography variant="body1">{productPrice.displayPrice}</Typography>
        </div>
        <div>
          <Typography variant="body1">{vendor}</Typography>
        </div>
      </div>
    );
  }

  render() {
    const { product } = this.props;

    return (
      <div>
        <Link route={this.productDetailHref}>
          <BadgeOverlay product={product}>
            {this.renderProductMedia()}
            {this.renderProductInfo()}
          </BadgeOverlay>
        </Link>
      </div>
    );
  }
}

export default ProductItem;

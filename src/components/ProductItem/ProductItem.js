import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Price from "@reactioncommerce/components/Price/v1";
import track from "lib/tracking/track";
import trackProductClicked from "lib/tracking/trackProductClicked";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import Link from "components/Link";
import Img from "components/Img";
import BadgeOverlay from "components/BadgeOverlay";
import { styles } from "./styles";

@withStyles(styles, { withTheme: true })
@track()
class ProductItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
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

  get primaryImage() {
    const { product: { primaryImage } } = this.props;
    if (!primaryImage) {
      return {
        URLs: {
          thumbnail: undefined,
          small: undefined
        }
      };
    }
    return primaryImage;
  }

  @trackProductClicked()
  handleAnchorClick = () => {}

  renderProductMedia() {
    const { classes, product: { description } } = this.props;

    return (
      <div className={classes.productMedia}>
        <Img altText={description} presrc={this.primaryImage.URLs.thumbnail} src={this.primaryImage.URLs.small} />
      </div>
    );
  }

  renderProductInfo() {
    const { classes, currencyCode, product: { pricing, title, vendor } } = this.props;
    const productPrice = priceByCurrencyCode(currencyCode, pricing) || {};

    return (
      <div >
        <div className={classes.productInfo}>
          <Typography variant="body2">
            {title}
          </Typography>
          <Typography variant="body1">
            <Price displayPrice={productPrice.displayPrice} />
          </Typography>
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
        <Link
          route={this.productDetailHref}
          onAnchorClick={this.handleAnchorClick}
        >
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

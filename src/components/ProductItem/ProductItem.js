import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "components/Link";
import Badge from "components/Badge";
import Img from "components/Img";
import { inventoryStatus, isProductLowQuantity, INVENTORY_STATUS, priceByCurrencyCode } from "lib/utils";
import { styles } from "./styles";

@withStyles(styles, { withTheme: true })
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

  renderProductImage() {
    const { product: { description } } = this.props;
    return <Img altText={description} presrc={this.primaryImage.URLs.thumbnail} src={this.primaryImage.URLs.small} />;
  }

  renderProductMedia() {
    const { classes, product } = this.props;
    const status = inventoryStatus(product);

    return (
      <div className={classes.productMedia}>
        {status && <Badge type={status.type} label={status.label} />}
        {isProductLowQuantity(product) && <Badge type={INVENTORY_STATUS.LOW_QUANTITY} label="Low Inventory" />}
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

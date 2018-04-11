import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const styles = () => ({
  root: {},
  productInfo: {
    display: "flex",
    justifyContent: "space-between"
  },
  productMedia: {
    position: "relative"
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

  renderProductMedia() {
    const { classes, product: { description } } = this.props;
    return (
      <div className={classes.productMedia}>
        <img className={classes.img} src="http://via.placeholder.com/200" alt={description} />
      </div>
    );
  }

  renderProductInfo() {
    const { classes, product: { price, title, vendor } } = this.props;
    return (
      <div className={classes.productInfo}>
        <div>
          <Typography variant="body2">{title}</Typography>
          <Typography variant="body1">{vendor}</Typography>
        </div>

        <div>
          <Typography variant="body2">${price.range ? price.range : price}</Typography>
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

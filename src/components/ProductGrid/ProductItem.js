import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const styles = () => ({
  productInfo: {},
  productMedia: {}
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
    const { product: { description } } = this.props;
    return (
      <div>
        <img src="http://via.placeholder.com/200" alt={description} />
      </div>
    );
  }

  renderProductInfo() {
    const { product: { title } } = this.props;
    return (
      <div>
        <Typography variant="title">{title}</Typography>
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

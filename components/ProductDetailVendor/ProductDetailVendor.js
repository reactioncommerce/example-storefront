import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

/**
 * Product detail vendor field
 * @class ProductDetailVendor
 */
class ProductDetailVendor extends Component {
  static propTypes = {
    /**
     * Product vendor
     */
    children: PropTypes.string
  }

  render() {
    const { children, ...props } = this.props;

    if (!children) return null;

    return (
      <Typography component="div" {...props}>{children}</Typography>
    );
  }
}

export default ProductDetailVendor;

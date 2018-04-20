import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

/**
 * Product detail basic info fields
 * @class ProductDetailTitle
 */
class ProductDetailInfo extends Component {
  static propTypes = {
    /**
     * Prodcut description
     */
    description: PropTypes.string,

    /**
     * Price or price range as a string
     */
    priceRange: PropTypes.string,

    /**
     * Product vendor
     */
    vendor: PropTypes.string
  }
  render() {
    const { priceRange, vendor, description } = this.props;

    // Render all props are undefined then skip rendering component
    if (!priceRange && !vendor && !description) return null;

    return (
      <Grid item sm={12}>
        {priceRange && <Typography component="div" gutterBottom={true} variant="title">{priceRange}</Typography>}
        {vendor && <Typography>{vendor}</Typography>}
        {description && <Typography>{description}</Typography>}
      </Grid>
    );
  }
}

export default ProductDetailInfo;

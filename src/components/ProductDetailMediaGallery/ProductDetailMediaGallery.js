import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import withStyles from "material-ui/styles/withStyles";

const styles = (theme) => ({

});

/**
 * Product detail media gallery
 * @class ProductDetailMediaGallery
 */
@withStyles(styles)
class ProductDetailMediaGallery extends Component {
  static propTypes = {
    /**
     * Media items
     */
    mediaItems: PropTypes.array
  }


  render() {
    const { mediaItems } = this.props;

    // If all props are undefined then skip rendering component
    if (!mediaItems) return null;

    return (
      <Grid item sm={12}>
        <div>

        </div>

        <div>

        </div>
      </Grid>
    );
  }
}

export default ProductDetailMediaGallery;

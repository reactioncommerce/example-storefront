import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonBase from "material-ui/ButtonBase";
import withStyles from "material-ui/styles/withStyles";

const styles = (theme) => ({
  root: {
    minWidth: 140
  },
  img: {
    width: "100%"
  }
});

/**
 * Product detail media gallery item
 * @class ProductDetailMediaGalleryItem
 */
@withStyles(styles)
class ProductDetailMediaGalleryItem extends Component {
  static propTypes = {
    /**
     * CSS class names
     */
    classes: PropTypes.object,

    /**
     * Product media
     */
    media: PropTypes.object
  }

  render() {
    const { classes, media } = this.props;

    // If all props are undefined then skip rendering component
    if (!media) return null;

    return (
      <ButtonBase className={classes.root}>
        <img
          className={classes.img}
          src={media.url}
          alt={media.metadata.description}
        />
      </ButtonBase>
    );
  }
}

export default ProductDetailMediaGalleryItem;

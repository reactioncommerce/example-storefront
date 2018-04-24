import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonBase from "material-ui/ButtonBase";
import withStyles from "material-ui/styles/withStyles";

const styles = () => ({
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
class MediaGalleryItem extends Component {
  static propTypes = {
    /**
     * CSS class names
     */
    classes: PropTypes.object,

    /**
     * Product media
     */
    media: PropTypes.object,

    /**
     * Click callback
     * @example (event, media) => {}
     */
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  /**
   * Click handler for ButtonBase
   * @param {SyntheticEvent} event Event
   * @returns {undefined}
   */
  handleClick = (event) => {
    this.props.onClick(event, this.props.media);
  }

  render() {
    const { classes, media } = this.props;

    // If all props are undefined then skip rendering component
    if (!media) return null;

    return (
      <ButtonBase className={classes.root} onClick={this.handleClick}>
        <img
          className={classes.img}
          src={media.url}
          alt={media.metadata.description}
        />
      </ButtonBase>
    );
  }
}

export default MediaGalleryItem;

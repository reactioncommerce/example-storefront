import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonBase from "@material-ui/core/ButtonBase";
import withStyles from "@material-ui/core/styles/withStyles";
import ProgressiveImage from "components/ProgressiveImage";

const styles = () => ({
  root: {
    width: "100%"
  }
});

/**
 * Product detail media gallery item
 * @class ProductDetailMediaGalleryItem
 */
class MediaGalleryItem extends Component {
  static propTypes = {
    /**
     * CSS class names
     */
    classes: PropTypes.object,

    /**
     * The 0-based integer position of this item within a group of MediaGalleryItems
     */
    index: PropTypes.number,

    /**
     * Product media
     */
    media: PropTypes.object,

    /**
     * Click callback
     * @example (event, media) => {}
     */
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => { }
  };

  /**
   * Click handler for ButtonBase
   * @param {SyntheticEvent} event Event
   * @returns {undefined}
   */
  handleClick = (event) => {
    this.props.onClick(event, this.props.media, this.props.index);
  };

  render() {
    const { classes, media } = this.props;

    // If all props are undefined then skip rendering component
    if (!media) return null;

    return (
      <ButtonBase className={classes.root} onClick={this.handleClick}>
        <ProgressiveImage presrc={media.URLs.thumbnail} src={media.URLs.thumbnail} />
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(MediaGalleryItem);

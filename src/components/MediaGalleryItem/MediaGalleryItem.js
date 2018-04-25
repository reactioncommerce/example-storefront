import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonBase from "material-ui/ButtonBase";
import withStyles from "material-ui/styles/withStyles";
import { inject, observer } from "mobx-react";

const styles = () => ({
  root: {
    maxWidth: "100%"
  },
  img: {
    width: "100%",
    objectFit: "cover"
  }
});

/**
 * Product detail media gallery item
 * @class ProductDetailMediaGalleryItem
 */
@withStyles(styles)
@inject("uiStore")
@observer
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
    this.props.onClick(event, this.props.media, this.props.index);
  }

  render() {
    const { classes, media, uiStore } = this.props;
    const { publicRuntimeConfig } = uiStore.appConfig;

    // If all props are undefined then skip rendering component
    if (!media) return null;

    return (
      <ButtonBase className={classes.root} onClick={this.handleClick}>
        <img
          className={classes.img}
          src={`${publicRuntimeConfig.externalAssetsUrl}${media.URLs.small}`}
          alt=""
        />
      </ButtonBase>
    );
  }
}

export default MediaGalleryItem;

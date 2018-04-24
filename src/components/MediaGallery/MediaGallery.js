import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import withStyles from "material-ui/styles/withStyles";
import { action, computed, observable } from "mobx";
import { inject, observer } from "mobx-react";
import MediaGalleryItem from "components/MediaGalleryItem";

const styles = (theme) => ({
  featured: {

  },
  featuredImage: {
    width: "100%"
  }
});

/**
 * Product detail media gallery
 * @class ProductDetailMediaGallery
 */
@withStyles(styles)
@inject("uiStore")
@observer
class MediaGallery extends Component {
  static propTypes = {
    /**
     * CSS Class names
     */
    classes: PropTypes.object,

    /**
     * Media items
     */
    mediaItems: PropTypes.arrayOf(PropTypes.object),

    /**
     * UIStore
     */
    uiStore: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.featuredMedia = Array.isArray(props.mediaItems) && props.mediaItems[0];
  }

  @observable _featuredMedia

  @computed get featuredMedia() {
    return this._featuredMedia;
  }

  set featuredMedia(value) {
    this._featuredMedia = value;
  }

  @action handleMediaItemClick = (event, mediaItem) => {
    this.featuredImage = mediaItem;
  }

  renderFeaturedImage() {
    const featurdMedia = this.featuredMedia;
    const { classes, uiStore } = this.props;
    const { publicRuntimeConfig } = uiStore.appConfig;

    if (featurdMedia && featurdMedia.URLs) {
      return (
        <img
          className={classes.featuredImage}
          src={`${publicRuntimeConfig.externalAssetsUrl}${this.featuredMedia.URLs.large}`}
          alt=""
        />
      );
    }

    return null;
  }

  render() {
    const { classes, mediaItems } = this.props;

    // If all props are undefined then skip rendering component
    if (!mediaItems) return null;

    return (
      <Grid item sm={12}>
        <div className={classes.featured}>
          {this.renderFeaturedImage()}
        </div>

        <div>
          {mediaItems.map((media, index) => (
            <MediaGalleryItem key={index} media={media} onClick={this.handleMediaItemClick} />
          ))}
        </div>
      </Grid>
    );
  }
}

export default MediaGallery;

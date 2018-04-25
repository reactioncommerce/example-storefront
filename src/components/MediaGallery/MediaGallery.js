import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import withStyles from "material-ui/styles/withStyles";
import { action, computed, observable } from "mobx";
import { inject, observer } from "mobx-react";
import MediaGalleryItem from "components/MediaGalleryItem";

const styles = () => ({
  root: {
    width: "100%"
  },
  featuredImage: {
    objectFit: "cover",
    width: "100%",
    maxHeight: "500px"
  }
});

/**
 * Product detail media gallery
 * @class ProductDetailMediaGallery
 */
@withStyles(styles, { withTheme: true })
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
    theme: PropTypes.object,

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

  /**
   * Media item click handler
   * @param {SyntheticEvent} event - Event
   * @param {Object} mediaItem - Media item object
   * @returns {undefined}
   */
  @action handleMediaItemClick = (event, mediaItem) => {
    this.featuredMedia = mediaItem;
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
    const { classes, mediaItems, theme } = this.props;

    // If all props are undefined then skip rendering component
    if (!mediaItems) return null;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12}>
          <div className={classes.featured}>
            {this.renderFeaturedImage()}
          </div>

          <Grid container spacing={theme.spacing.unit * 2}>
            {mediaItems.map((media, index) => (
              <Grid item xs={3} sm={2}>
                <MediaGalleryItem
                  key={index}
                  media={media}
                  onClick={this.handleMediaItemClick}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default MediaGallery;

import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { action, computed, observable } from "mobx";
import { inject, observer } from "mobx-react";
import MediaGalleryItem from "components/MediaGalleryItem";

const styles = (theme) => ({
  root: {
    width: "100%"
  },
  featured: {
    display: "flex",
    justifyContent: "center",
    height: "500px",
    maxHeight: "500px",
    overflow: "hidden",
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.up("xs")]: {
      maxHeight: "300px"
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: "300px"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "500px"
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "500px"
    }
  },
  featuredImage: {
    flex: 0,
    height: "100%"
  }
});

const placeholderImage = "/resources/placeholder.gif";

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
    const { featuredMedia } = this;
    const { classes, uiStore } = this.props;
    const { publicRuntimeConfig } = uiStore.appConfig;
    const mediaUrl = featuredMedia && featuredMedia.URLs && featuredMedia.URLs.large;

    return (
      <img
        className={classes.featuredImage}
        src={`${publicRuntimeConfig.externalAssetsUrl}${mediaUrl || placeholderImage}`}
        alt=""
      />
    );
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

          <Grid container spacing={theme.spacing.unit}>
            {mediaItems.map((media, index) => (
              <Grid
                item
                key={index}
                xs={3}
                sm={2}
              >
                <MediaGalleryItem
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

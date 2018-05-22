import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import withStyles from "material-ui/styles/withStyles";
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
     * MUI Theme
     */
    theme: PropTypes.object,

    /**
     * UIStore
     */
    uiStore: PropTypes.object
  }

  static defaultProps = {
    mediaItems: []
  };

  state = { featuredMediaIndex: 0 };

  /**
   * @name handleMediaItemClick
   * @param {SyntheticEvent} event Event
   * @param {Object} media The `media` prop of the MediaGalleryItem that was clicked
   * @param {Number} index The `index` prop of the MediaGalleryItem that was clicked
   * @returns {undefined} Nothing
   */
  handleMediaItemClick = (event, media, index) => {
    this.setState({ featuredMediaIndex: index });
  };

  renderFeaturedImage() {
    const { classes, mediaItems, uiStore } = this.props;
    const { publicRuntimeConfig } = uiStore.appConfig;
    const featuredMedia = mediaItems[this.state.featuredMediaIndex];
    const mediaUrl = featuredMedia && featuredMedia.URLs && featuredMedia.URLs.large;

    return (
      <img
        className={classes.featuredImage}
        src={`${publicRuntimeConfig.externalAssetsUrl}${mediaUrl || publicRuntimeConfig.placeholderImageUrls.galleryFeatured}`}
        alt=""
      />
    );
  }

  render() {
    const { classes, mediaItems, theme } = this.props;

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
                  index={index}
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ProgressiveImage from "components/ProgressiveImage";
import MediaGalleryItem from "components/MediaGalleryItem";

const styles = (theme) => ({
  root: {
    width: "100%"
  },
  featured: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing()
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
    theme: PropTypes.object
  };

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

  renderPlaceHolderImg = () => {
    const placeholderURL = "/images/placeholder.gif";
    return (
      <ProgressiveImage
        presrc={placeholderURL}
        src={placeholderURL}
      />
    );
  }

  renderFeaturedImage() {
    const { mediaItems } = this.props;

    // Render placeholder, when product does not have images set.
    if (Array.isArray(mediaItems) && mediaItems.length === 0) {
      return this.renderPlaceHolderImg();
    }

    const featuredMedia = mediaItems[this.state.featuredMediaIndex];
    const mediaUrls = featuredMedia && featuredMedia.URLs;

    // TODO: figure out the correct usage of alt text here
    // LINK TO GH ISSUE
    return <ProgressiveImage presrc={mediaUrls && mediaUrls.thumbnail} src={mediaUrls && mediaUrls.large} />;
  }

  render() {
    const { classes, mediaItems } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12}>
          <div className={classes.featured}>{this.renderFeaturedImage()}</div>

          <Grid container spacing={1}>
            {mediaItems.map((media, index) => (
              <Grid item key={index} xs={3} sm={2}>
                <MediaGalleryItem index={index} media={media} onClick={this.handleMediaItemClick} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MediaGallery);

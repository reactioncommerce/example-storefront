import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import withStyles from "material-ui/styles/withStyles";
import { action, computed, observable } from "mobx";
import { inject, observer } from "mobx-react";
import MediaGalleryIttem from "./ProductDetailMediaGalleryItem";

const styles = (theme) => ({

});

/**
 * Product detail media gallery
 * @class ProductDetailMediaGallery
 */
@withStyles(styles)
@observer
class MediaGallery extends Component {
  static propTypes = {
    /**
     * Media items
     */
    mediaItems: PropTypes.array
  }

  @observable _featuredMedia

  constructor(props) {
    super(props);

    this.featuredMedia = Array.isArray(props.media) && props.media[0];
  }

  @computed get featuredMedia() {
    return this._featuredMedia;
  }

  set featuredMedia(value) {
    this._featuredMedia = value;
  }

  @action handleMediaItemClick = (event, mediaItem) => {
    this.featuredImage = mediaItem;
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
          {mediaItems.map((media) => (
            <MediaGalleryIttem media={media} onClick={this.handleMediaItemClick} />
          ))}
        </div>
      </Grid>
    );
  }
}

export default MediaGallery;

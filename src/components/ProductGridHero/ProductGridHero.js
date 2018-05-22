import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Fade from "material-ui/transitions/Fade";
import Hidden from "material-ui/Hidden";
import LoadingIcon from "mdi-material-ui/Loading";
import styles from "./styles";


@withStyles(styles, { withTheme: true })
@inject("uiStore")
export default class ProductGridHero extends Component {
  static propTypes = {
    classes: PropTypes.object,
    tag: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    tag: {},
    theme: {},
    uiStore: {}
  };

  state = { hasImageLoaded: false };

  onImageLoad = () => {
    const { hasImageLoaded } = this.state;
    if (hasImageLoaded) return;
    this.setState({ hasImageLoaded: true });
  };

  buildImgUrl(imgPath) {
    const { uiStore: { appConfig: { publicRuntimeConfig } } } = this.props;
    return `${publicRuntimeConfig.externalAssetsUrl}${imgPath}`;
  }

  renderProductImage() {
    const {
      classes,
      classes: { img, imgLoading, loadingIcon },
      tag: { media },
      theme: {
        breakpoints: { values }
      }
    } = this.props;
    const { hasImageLoaded } = this.state;

    if (!media) {
      return null;
    }

    const picture = (
      <picture>
        <source srcSet={this.buildImgUrl(media.URLs.small)} media={`(min-width: ${values.sm}px)`} />
        <source srcSet={this.buildImgUrl(media.URLs.medium)} media={`(min-width: ${values.md}px)`} />
        <source srcSet={this.buildImgUrl(media.URLs.large)} media={`(min-width: ${values.lg}px)`} />
        <img
          className={classes.heroImg}
          src={this.buildImgUrl(media.URLs.small)}
          alt=""
          onLoad={this.onImageLoad}
          ref={(image) => {
            if (image && image.complete) this.onImageLoad();
            return;
          }}
        />
      </picture>
    );

    const loading = (
      <div className={imgLoading}>
        <LoadingIcon className={loadingIcon} />
      </div>
    );

    return (
      <Fragment>
        <Fade in={hasImageLoaded}>{picture}</Fade>
        <Hidden xsUp={hasImageLoaded}>{loading}</Hidden>
      </Fragment>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.productGridContainer}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.renderProductImage()}
          </Grid>
        </Grid>
      </section>
    );
  }
}

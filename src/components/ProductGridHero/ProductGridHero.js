import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Fade from "material-ui/transitions/Fade";
import Hidden from "material-ui/Hidden";
import LoadingIcon from "mdi-material-ui/Loading";

const styles = (theme) => ({
  heroImg: {
    width: "100%",
    height: "325px",
    objectFit: "cover"
  },
  productGridContainer: {
    maxWidth: theme.grid.productGridMaxWidth,
    marginLeft: "auto",
    marginRight: "auto"
  }
});


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
      tag: { heroMediaUrl },
      theme: {
        breakpoints: { values }
      }
    } = this.props;
    const { hasImageLoaded } = this.state;

    if (!heroMediaUrl) {
      return null;
    }

    const picture = (
      <picture>
        <img
          className={classes.heroImg}
          src={heroMediaUrl}
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

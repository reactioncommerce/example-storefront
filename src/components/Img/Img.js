import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";

const styles = ({ palette, transitions, zIndex }) => {
  console.log(palette.grey);
  return {
    imgWrapper: {
      backgroundColor: palette.grey["100"],
      display: `block`,
      height: 0,
      overflow: "hidden",
      paddingTop: `100%`,
      position: `relative`,
      width: `100%`
    },
    img: {
      height: `auto`,
      left: "50%",
      opacity: 1,
      position: `absolute`,
      transition: `opacity ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%"
    },
    imgLoaded: {
      zIndex: zIndex.mobileStepper
    },
    imgLoading: {
      filter: `blur(8px)`,
      zIndex: zIndex.appBar
    },
    imgHidden: {
      opacity: 0
    }
  };
};

@withStyles(styles, { withTheme: true })
@inject("uiStore")
class Img extends Component {
  static propTypes = {
    URLs: PropTypes.shape({
      large: PropTypes.string,
      medium: PropTypes.string,
      original: PropTypes.string,
      small: PropTypes.string,
      thumbnail: PropTypes.string
    }),
    altText: PropTypes.string,
    classes: PropTypes.object,
    isGrid: PropTypes.boolean,
    uiStore: PropTypes.object,
    theme: PropTypes.object
  };

  static defaultProps = {
    URLs: {},
    altText: ""
  };

  state = { ready: false };
  _urls = {};
  _mounted = false;

  get assetsPath() {
    const { uiStore: { appConfig: { publicRuntimeConfig } } } = this.props;
    return publicRuntimeConfig.externalAssetsUrl;
  }

  get placeholder() {
    const { uiStore: { appConfig: { publicRuntimeConfig } } } = this.props;
    return `${this.assetsPath}${publicRuntimeConfig.placeholderImageUrls.productGrid}`;
  }

  get imageUrls() {
    const { URLs, isGrid } = this.props;
    const imageUrls = {
      thumbnail: this.placeholder,
      small: this.placeholder,
      medium: this.placeholder,
      large: this.placeholder
    };

    Object.keys(URLs).forEach((key) => {
      if (key === "__typename") return;
      if (isGrid) {
        imageUrls[key] = `${this.assetsPath}${URLs.small}`;
      } else {
        imageUrls[key] = `${this.assetsPath}${URLs[key]}`;
      }
    });
    return imageUrls;
  }

  componentWillMount() {
    this._mounted = true;
    this._urls = this.imageUrls;
    if (process.browser) {
      const buffer = new Image();
      buffer.onload = () => this._mounted && this.setState({ ready: true });
      buffer.src = this._urls.small;
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderPicture() {
    const { altText, classes, theme: { breakpoints: { values } } } = this.props;
    return (
      <picture>
        <source media={`(min-width: ${values.md}px)`} srcSet={this._urls.large} />
        <source media={`(min-width: ${values.sm}px)`} srcSet={this._urls.medium} />
        <img src={this._urls.small} className={`${classes.img} ${classes.imgLoaded}`} alt={altText} />
      </picture>
    );
  }

  renderLoadingImage() {
    const { classes } = this.props;
    const { ready } = this.state;
    return (
      <img
        src={this._urls.thumbnail}
        className={`${classes.img} ${classes.imgLoading} ${ready ? classes.imgHidden : ""}`}
        alt=""
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { ready } = this.state;
    return (
      <div className={classes.imgWrapper}>
        {ready ? this.renderPicture() : null}
        {this.renderLoadingImage()}
      </div>
    );
  }
}

export default Img;

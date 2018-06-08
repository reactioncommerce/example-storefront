import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { mockImg } from "./__mocks__/img.mocks";

const styles = ({ palette, transitions }) => {
  console.log(transitions);
  return {
    imgWrapper: {
      backgroundColor: palette.grey.A100,
      display: `block`,
      height: 0,
      paddingTop: `100%`,
      position: `relative`,
      width: `100%`
    },
    img: {
      height: `auto`,
      left: 0,
      opacity: 1,
      position: `absolute`,
      top: 0,
      transition: `opacity ${transitions.duration.standard}ms ${transitions.easing.sharp}`,
      width: `100%`
    },
    imgLoaded: {},
    imgLoading: {
      filter: `blur(8px)`
    },
    imgHidden: {
      opacity: 0
    }
  };
};

@withStyles(styles, { withTheme: true })
class Img extends Component {
  static propTypes = {
    URLs: PropTypes.shape({
      large: PropTypes.String,
      medium: PropTypes.String,
      original: PropTypes.String,
      small: PropTypes.String,
      thumbnail: PropTypes.String
    }),
    altText: PropTypes.String,
    classes: PropTypes.object,
    src: PropTypes.String,
    theme: PropTypes.object
  };

  static defaultProps = mockImg;

  state = { ready: false };
  _mounted = false;

  componentWillMount() {
    this._mounted = true;
    const buffer = new Image();
    buffer.onload = () => this._mounted && this.setState({ ready: true });
    buffer.src = this.props.URLs.small;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderPicture() {
    const { altText, classes, URLs, theme: { breakpoints: { values } } } = this.props;
    return (
      <picture>
        <source media={`(min-width: ${values.md}px)`} srcSet={URLs.large} />
        <source media={`(min-width: ${values.sm}px)`} srcSet={URLs.medium} />
        <img src={URLs.small} className={`${classes.img} ${classes.imgLoaded}`} alt={altText} />
      </picture>
    );
  }

  renderPlaceholder() {
    const { altText, classes, URLs } = this.props;
    const { ready } = this.state;
    return (
      <img
        src={URLs.thumbnail}
        className={`${classes.img} ${classes.imgLoading} ${ready ? classes.imgHidden : ""}`}
        alt={altText}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { ready } = this.state;
    return (
      <div className={classes.imgWrapper}>
        {ready ? this.renderPicture() : null}
        {this.renderPlaceholder()}
      </div>
    );
  }
}

export default Img;

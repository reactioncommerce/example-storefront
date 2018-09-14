import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

/**
 * @file Img component does a "Medium/Instagram" like progressive loading effect for images.
 * To achieve this the component first renders an img element with a tiny version of the full resolution image.
 * This low res image should download quickly and will be blurred by the CSS removing the pixelation.
 * The component then creates an Image buffer with a src of the full resolution image.
 * Once the buffer loads the full resolution image the blurred low resimg will fade out revealing the full res image.
 *
 * @module Img
 * @extends Component
 */

const styles = (theme) => theme.Img;

@withStyles(styles, { withTheme: true })
class Img extends Component {
  static propTypes = {
    /**
     * Image text alternative - [alt text]{@link https://www.w3.org/TR/WCAG20-TECHS/H37.html}
     */
    altText: PropTypes.string,
    /**
     * CSS class names
     */
    classes: PropTypes.object,
    /**
     * True if `Img` component is being used for a page hero image
     */
    isHero: PropTypes.bool,
    /**
     * Pre load image source: Provide a tiny version of the image to create a medium like progressive loading effect
     */
    presrc: PropTypes.string,
    /**
     * Image source
     */
    src: PropTypes.string,
    /**
     * Image sources for use with a picture element
     */
    srcs: PropTypes.shape({
      large: PropTypes.string,
      medium: PropTypes.string,
      original: PropTypes.string,
      small: PropTypes.string,
      thumbnail: PropTypes.string
    }),
    /**
     * MUI theme provider
     */
    theme: PropTypes.object
  };

  static defaultProps = {
    altText: "",
    isHero: false,
    presrc: "",
    src: ""
  };

  state = { ready: false };

  componentDidMount() {
    this._mounted = true;
    if (process.browser) {
      this.lazyLoad();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  /**
   * Private check for component mount, used in image buffer
   */
  _mounted = false;

  /**
   * Private prop for the img wrapper div, used in intersection observer
   */
  _wrapper = null;

  /**
   *
   * @method supportIntersectionObserver
   * @summary `IntersectionObserver` feature detection
   * @return {Boolean} - `true` if `IntersectionObserver` is supported by browser
   */
  get supportIntersectionObserver() {
    return "IntersectionObserver" in window;
  }

  /**
   *
   * @method lazyLoad
   * @summary If `IntersectionObserver` is supported create a new one and watch for the `_wrapper` element
   * to scroll within the viewport, once it's with 50px of the viewport start loading the full res image.
   * If the `IntersectionObserver` isn't supported just load the image normally.
   * [Intersection Observer]{@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API}
   * @return {undefined}
   */
  lazyLoad() {
    if (this.supportIntersectionObserver) {
      const viewportIntersection = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0 && !this.state.ready) {
              this.loadImage();
            }
          });
        },
        { root: null, rootMargin: "50px 0px", threshold: 0.01 }
      );

      viewportIntersection.observe(this._wrapper);
    } else {
      this.loadImage();
    }
  }

  /**
   *
   * @method loadImage
   * @summary Create a new `Image` buffer and set the `src` to be
   * ether the `props.src` or `props.srcs.small` if a responsive picture.
   * Once the buffer loads set the `ready` state to `true`
   * @return {undefined}
   */
  loadImage() {
    const { src, srcs } = this.props;
    const buffer = new Image();
    buffer.onload = () => this._mounted && this.setState({ ready: true });
    buffer.src = src || (srcs && srcs.small);
  }

  /**
   *
   * @method renderPicture
   * @summary Renders a `picture` element with the provided theme breakpoints and `props.srcs`
   * @return {Element} - `picture`
   */
  renderPicture() {
    const { altText, classes, srcs, theme: { breakpoints: { values } } } = this.props;
    return (
      <picture>
        <source media={`(min-width: ${values.md}px)`} srcSet={srcs && srcs.large} />
        <source media={`(min-width: ${values.sm}px)`} srcSet={srcs && srcs.medium} />
        <img src={srcs && srcs.small} className={`${classes.img} ${classes.imgLoaded}`} alt={altText} />
      </picture>
    );
  }

  /**
   *
   * @method renderImg
   * @summary Renders a `img` element with the provided `props.src`
   * @return {Element} - `img`
   */
  renderImg() {
    const { altText, classes, src } = this.props;
    return <img src={src} className={`${classes.img} ${classes.imgLoaded}`} alt={altText} />;
  }

  /**
   *
   * @method renderImage
   * @summary If a `props.src` is provided call `renderImg` else call `renderPicture`
   * @return {Element} - `picture` or `img`
   */
  renderImage() {
    const { src } = this.props;
    return src ? this.renderImg() : this.renderPicture();
  }

  /**
   *
   * @method renderLoadingImage
   * @summary Renders a `img` element with the provided `props.presrc`
   * once the full res image has loaded this `img` will fade out
   * @return {Element} - `img`
   */
  renderLoadingImage() {
    const { classes, presrc } = this.props;
    const { ready } = this.state;
    return (
      <img src={presrc} className={`${classes.img} ${classes.imgLoading} ${ready ? classes.imgHidden : ""}`} alt="" />
    );
  }

  render() {
    const { classes, isHero } = this.props;
    const { ready } = this.state;
    const wrapperClass = `${classes.imgWrapper} ${isHero ? classes.imgHeroWrapper : ""}`;
    return (
      <div
        className={wrapperClass}
        ref={(wrapper) => {
          this._wrapper = wrapper;
        }}
      >
        {ready ? this.renderImage() : null}
        {this.renderLoadingImage()}
      </div>
    );
  }
}

export default Img;

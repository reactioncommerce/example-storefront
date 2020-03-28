import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContainerQuery } from "react-container-query";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";

const imageContainerQueries = {
  isLargeWidth: {
    minWidth: 301 // Use medium image (600px) until container width is greater than image width / 2 (up to 2x scaling)
  }
};

/**
 * @file Image component does a "Medium/Instagram" like progressive loading effect for images.
 * To achieve this the component first renders an img element with a tiny version of the full resolution image.
 * This low res image should download quickly and will be blurred by the CSS removing the pixelation.
 * The component then creates an Image buffer with a src of the full resolution image.
 * Once the buffer loads the full resolution image the blurred low res img will fade out revealing the full res image.
 *
 */

const ImageWrapper = styled.div`
  background-color: ${applyTheme("ProgressiveImage.backgroundColor")};
  display: block;
  height: 0;
  overflow: hidden;
  padding-top: 100%;
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  width: ${({ fit }) => (fit === "contain" && "100%") || "auto"};
  height: ${({ fit }) => (fit === "cover" && "100%") || "auto"};
  left: 50%;
  opacity: 1;
  position: absolute;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  top: 50%;
  transform: translate(-50%, -50%);

  ${({ isLoading, isLoaded, isHidden }) => {
    let styles = "";

    if (isLoading) {
      styles += `
        filter: blur(8px);
        z-index: 1100;`;
    }
    if (isLoaded) {
      styles += "z-index: 1000;";
    }
    if (isHidden) {
      styles += "opacity: 0;";
    }

    return styles;
  }}
`;

class ProgressiveImage extends Component {
  static propTypes = {
    /**
     * Image text alternative - https://www.w3.org/TR/WCAG20-TECHS/H37.html
     */
    altText: PropTypes.string,
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * How the image should fit its container. "contain" (100% width, auto-scaled height, no clipping),
     * or "cover" (100% height, auto-scaled width centered horizontally, with clipping). Both options maintain the image's original aspect ratio.
     */
    fit: PropTypes.string,
    /**
     * Pre load image source: Provide a tiny version of the image to create a medium like progressive loading effect
     */
    presrc: PropTypes.string,
    /**
     * Image source
     */
    src: PropTypes.string,
    /**
     * Image sources - used to create a responsive image via the picture tag
     */
    srcs: PropTypes.shape({
      large: PropTypes.string,
      medium: PropTypes.string,
      small: PropTypes.string
    })
  };

  static defaultProps = {
    altText: "",
    fit: "contain"
  };

  state = { ready: false };

  componentDidMount() {
    this._mounted = true;
    if (typeof window !== "undefined") {
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
    if (typeof window === "undefined") {
      return false;
    }
    return "IntersectionObserver" in window;
  }

  /**
   *
   * @method lazyLoad
   * @summary If `IntersectionObserver` is supported create a new one and watch for the `_wrapper` element
   * to scroll within the viewport, once it's with 50px of the viewport start loading the full res image.
   * If the `IntersectionObserver` isn't supported just load the image normally.
   * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   * @return {Undefined} Nothing
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
   * ether the `props.src` or `props.srcs.medium` if a responsive picture.
   * Once the buffer loads set the `ready` state to `true`
   * @return {Undefined} Nothing
   */
  loadImage() {
    const { src, srcs } = this.props;
    const buffer = new Image();
    buffer.onload = () => {
      this._mounted && this.setState({ ready: true });
    };
    buffer.src = src || (srcs && srcs.medium);
  }

  /**
   *
   * @method renderResponsiveImage
   * @summary Renders an image that uses medium by default, and large when appropriate container width
   *  (see imageContainerQueries definition)
   * @return {Element} - `picture`
   */
  renderResponsiveImage() {
    const { altText, fit, srcs } = this.props;
    const { medium, large } = srcs;

    return (
      <ContainerQuery query={imageContainerQueries}>
        {(params) => {
          let src = medium;
          const { isLargeWidth } = params;
          if (isLargeWidth) {
            src = large;
          }

          return (
            <Img
              src={src}
              isLoaded={true}
              alt={altText}
              fit={fit}
            />
          );
        }}
      </ContainerQuery>
    );
  }

  /**
   *
   * @method renderImg
   * @summary Renders a `img` element with the provided `props.src`
   * @return {Element} - `img`
   */
  renderImg() {
    const { altText, fit, src } = this.props;
    return <Img src={src} isLoaded={true} alt={altText} fit={fit} />;
  }

  /**
   *
   * @method renderImage
   * @summary If a `props.src` is provided call `renderImg` else call `renderResponsiveImage`
   * @return {Element} - `picture` or `img`
   */
  renderImage() {
    const { src } = this.props;
    return src ? this.renderImg() : this.renderResponsiveImage();
  }

  /**
   *
   * @method renderLoadingImage
   * @summary Renders a `img` element with the provided `props.presrc`
   * once the full res image has loaded this `img` will fade out
   * @return {Element} - `img`
   */
  renderLoadingImage() {
    const { fit, presrc } = this.props;
    const { ready } = this.state;
    return (
      <Img
        src={presrc}
        isLoading={true}
        isHidden={ready}
        alt=""
        fit={fit}
      />
    );
  }

  render() {
    const { className, presrc } = this.props;
    const { ready } = this.state;
    return (
      <ImageWrapper className={className} ref={(wrapper) => { this._wrapper = wrapper; }}>
        {ready ? this.renderImage() : null}
        {presrc && this.renderLoadingImage()}
      </ImageWrapper>
    );
  }
}

export default ProgressiveImage;

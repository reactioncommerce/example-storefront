import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";

export function withAssetPath(Comp) {
  @inject("uiStore")
  class WithAssetPath extends Component {
    static propTypes = {
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
       * UI Store from mobX
       */
      uiStore: PropTypes.object
    };

    /**
     *
     * @method assetsPath
     * @summary Get the external assets path from the `publicjRuntimeConfig`
     * @return {String} - assets path (i.e. "http://localhost:3000", "https://assets.ecommerce-site.com")
     */
    get assetsPath() {
      const { uiStore: { appConfig: { publicRuntimeConfig } } } = this.props;
      return publicRuntimeConfig.externalAssetsUrl;
    }

    /**
     *
     * @method placeholder
     * @summary Get the placeholder image path
     * @return {String} - placeholder path (i.e. "http://localhost:3000/resouces/placeholder.gif", "https://assets.ecommerce-site.com/placeholder.gif")
     */
    get placeholder() {
      const { uiStore: { appConfig: { publicRuntimeConfig } } } = this.props;
      return `${this.assetsPath}${publicRuntimeConfig.placeholderImageUrls.productGrid}`;
    }

    /**
     *
     * @method imagePaths
     * @summary For responsive images get the image paths for each breakpoint's image src
     * @return {Object} - object of each breakpoints image path
     */
    get imagePaths() {
      const { srcs } = this.props;
      if (!srcs) return;
      const imagePaths = {};

      Object.keys(srcs).forEach((key) => {
        if (key === "__typename") return;
        imagePaths[key] = `${this.assetsPath}${srcs[key]}`;
      });
      return imagePaths;
    }

    /**
     *
     * @method imagePath
     * @summary Get the image path
     * @return {String} - image path (i.e. "http://localhost:3000/image.jpg", "https://assets.ecommerce-site.com/image.png")
     */
    get imagePath() {
      const { src } = this.props;
      return src ? `${this.assetsPath}${src}` : this.placeholder;
    }

    /**
     *
     * @method preImagePath
     * @summary Get the pre loaded image path
     * @return {String} - image path (i.e. "http://localhost:3000/image.jpg", "https://assets.ecommerce-site.com/image.png")
     */
    get preImagePath() {
      const { presrc } = this.props;
      return presrc ? `${this.assetsPath}${presrc}` : this.placeholder;
    }

    render() {
      const { src, srcs, presrc, uiStore, ...props } = this.props;
      return <Comp presrc={this.preImagePath} src={this.imagePath} srcs={this.imagePaths} {...props} />;
    }
  }
  return WithAssetPath;
}

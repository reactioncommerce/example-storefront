import React from "react";
import track from "./track";

/**
 * trackProduct higher tracks a product
 * @name trackProduct
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (Component) => {
  const component = class trackProduct extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
  };

  return track(({ product }) => {
    if (product) {
      return {
        action: "Product Viewed",
        product_id: product._id, // eslint-disable-line camelcase
        name: product.title
      };
    }

    return {};
  }, {
    ...options
  })(component);
};

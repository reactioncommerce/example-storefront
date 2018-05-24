/* eslint-disable camelcase */
import React from "react";
import track from "./track";

/**
 * trackProduct higher tracks a product
 * @name trackProduct
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (Component) => {
  const component = class trackProductList extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
  };

  return track(({ catalogItems }) => {
    let products = [];

    if (Array.isArray(catalogItems)) {
      // TODO: conform to segment.io schema
      // https://segment.com/docs/spec/ecommerce/v2/#product-list-viewed
      products = catalogItems.map((catalogItem) => ({
        product_id: catalogItem.node._id
      }));
    }

    return {
      action: "Product List Viewed",
      list_id: "",
      category: "",
      products
    };
  }, {
    ...options
  })(component);
};

/* eslint-disable camelcase */
import React from "react";
import track from "./track";

/**
 * trackProductListViewed higher tracks a list of viewed products
 * @name trackProductListViewed
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (Component) => {
  const component = class trackProductListViewed extends React.Component {
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
      // Issue: https://github.com/reactioncommerce/reaction-next-starterkit/issues/56
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

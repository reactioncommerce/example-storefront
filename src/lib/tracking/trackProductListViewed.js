import track from "./track";
import getProductListTrackingData from "./utils/getProductListTrackingData";

/**
 * trackProductListViewed higher tracks a list of viewed products
 * @name trackProductListViewed
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => track(({ tag, catalogItems }) => {
  const products = (Array.isArray(catalogItems) && catalogItems.map((catalogItem) => catalogItem.node.product)) || undefined;
  return {
    action: "Product List Viewed",
    ...getProductListTrackingData({ tag, products })
  };
}, {
  ...options
});

import getProductListTrackingData from "./utils/getProductListTrackingData";

/**
 * trackProductListViewed tracks a list of viewed products
 * @name trackProductListViewed
 * @param {Object} payload options to supply to tracking
 * @returns {Object} - Object with the data to be tracked
 */
const trackProductListViewed = (payload) => {
  const { tag, catalogItems } = payload;
  const products = (Array.isArray(catalogItems) && catalogItems.map((catalogItem) => catalogItem.node.product)) || undefined;

  return {
    ...getProductListTrackingData({ tag, products })
  };
};

export default trackProductListViewed;
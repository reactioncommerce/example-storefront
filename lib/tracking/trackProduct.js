import getProductTrackingData from "./utils/getProductTrackingData";
import getVariantTrackingData from "./utils/getVariantTrackingData";

/**
 * trackProduct to tracks a product
 * @name trackProduct
 * @param {Object} payload data to be tracked
 * @returns {React.Component} - component
 */
const trackProduct = (payload) => {
  const { product, variant, optionId, url } = payload;
  let data = {};
  // If product data is provided as a prop, then process the data for tracking
  if (product) {
    data = {
      ...getProductTrackingData(product, url)
    };

    // Add variant data if available
    if (variant) {
      data = {
        ...data,
        ...getVariantTrackingData({
          product,
          url,
          variant,
          optionId
        })
      };
    }
  }

  return data;
};

export default trackProduct;

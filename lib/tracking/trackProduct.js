import getProductTrackingData from "./utils/getProductTrackingData";
import getVariantTrackingData from "./utils/getVariantTrackingData";

/**
 * trackProduct to tracks a product
 * @name trackProduct
 * @param {Object} payload data to be tracked
 * @param {Object} router router next js
 * @returns {React.Component} - component
 */
export default (payload, router) => {
  const { product, variant, optionId, action } = payload;
  let data = {};
  // If product data is provided as a prop, then process the data for tracking
  if (product) {
    data = {
      action,
      ...getProductTrackingData(product, router)
    };

    // Add variant data if available
    if (variant) {
      data = {
        ...data,
        ...getVariantTrackingData({
          product,
          router,
          variant, // Object representing a variant. (Required)
          optionId // Selected option of the provided variant, if available. (Optional)
        }),
        allDataProduct: product // Full product document for additional data. (Optional)
      };
    }
  }

  return data;
};

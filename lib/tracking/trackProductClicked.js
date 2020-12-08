import getProductTrackingData from "./utils/getProductTrackingData";

/**
 * @name trackProductClicked
 * @summary tracks the "Product Clicked" event.
 * @param {Object} payload options to supply to tracking
 * @returns {Object} - Object with the data to be tracked
 */
const trackProductClicked = (payload) => {
  let data = {};
  const { product } = payload;

  // If product data is provided as a prop, then process the data for tracking
  if (product) {
    data = {
      ...getProductTrackingData(product)
    };
  }

  return data;
};

export default trackProductClicked;

import track from "./track";
import getProductTrackingData from "./utils/getProductTrackingData";
import getVariantTrackingData from "./utils/getVariantTrackingData";

/**
 * trackProduct HOC tracks a product
 * @name trackProduct
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (
  track(({ product, router }, state, functionArgs) => {
    let data = {};
    const { variant, optionId, action } = (functionArgs && functionArgs[0]) || [];

    // If product data is provided as a prop, then process the data for tracking
    if (product) {
      data = {
        action,
        ...getProductTrackingData(product)
      };

      // Add variant data if available
      if (variant) {
        data = {
          ...data,
          ...getVariantTrackingData({
            product, // Full product document for additional data. (Optional)
            variant, // Object representing a variant. (Required)
            optionId // Selected option of the provided variant, if available. (Optional)
          })
        };
      }

      // If the router is provided as a prop, set the url of the product to the current path
      if (router) {
        data.url = router.asPath;
      }
    }

    return data;
  }, options)
);

import track from "./track";
import getProductTrackingData from "./utils/getProductTrackingData";

/**
 * trackProductViewed higher tracks a product
 * @name trackProductViewed
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (
  track(({ product, router }) => {
    let data = {
      action: "Product Viewed"
    };

    // If product data is provided as a prop, then process the data for tracking
    if (product) {
      data = {
        ...data,
        ...getProductTrackingData(product)
      }
    }

    // If the router is provided as a prop, set the url of the product to the current path
    if (router) {
      data.url = router.asPath;
    }

    return data;
  }, options)
);

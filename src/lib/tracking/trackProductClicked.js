import track from "./track";
import getProductTrackingData from "./utils/getProductTrackingData";

/**
 * trackProductClicked tracks the "Product Clicked" Segment event
 * @name trackProductClicked
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (
  track(({ product }) => {
    let data = {};

    // If product data is provided as a prop, then process the data for tracking
    if (product) {
      data = {
        action: "Product Clicked",
        ...getProductTrackingData(product)
      };
    }

    return data;
  }, options)
);

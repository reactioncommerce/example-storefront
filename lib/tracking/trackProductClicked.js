import track from "./track";
import getProductTrackingData from "./utils/getProductTrackingData";

/**
 * @name trackProductClicked
 * @summary tracks the "Product Clicked" Segment event. Expects the function it decorates to have a second argument,
 *  being the product that was clicked
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (
  track((props, state, methodArgs) => {
    let data = {};

    const product = methodArgs && methodArgs[1];

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

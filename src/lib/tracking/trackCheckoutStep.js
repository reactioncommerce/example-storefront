import track from "./track";

/**
 * trackCheckoutStep HOC tracks the "Checkout Step Viewed | Completed" events
 * @name trackCheckoutStep
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) =>
  // eslint-disable-next-line no-unused-vars
  track(({ router }, state, functionArgs) => {
    const {
      action,
      payment_method, // eslint-disable-line camelcase
      shipping_method, // eslint-disable-line camelcase
      step
    } = (functionArgs && functionArgs[0]) || [];

    return {
      action,
      payment_method, // eslint-disable-line camelcase
      shipping_method, // eslint-disable-line camelcase
      step

    };
  }, options);

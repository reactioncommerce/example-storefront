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
      step, 
      shipping_method, 
      payment_method, 
      action 
    } = (functionArgs && functionArgs[0]) || [];

    return {
      action,
      step,
      shipping_method,
      payment_method
    };
  }, options);

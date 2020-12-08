/**
 * trackCheckoutStep tracks the "Checkout Step Viewed | Completed" events
 * @name trackCheckoutStep
 * @param {Object} payload options to supply to tracking event
 * @returns {Object} - Object with the data to be tracked
 */
const trackCheckoutStep = (payload) => {
  const {
    checkout_id, // eslint-disable-line camelcase
    payment_method, // eslint-disable-line camelcase
    shipping_method, // eslint-disable-line camelcase
    step
  } = payload;

  return {
    checkout_id, // eslint-disable-line camelcase
    payment_method, // eslint-disable-line camelcase
    shipping_method, // eslint-disable-line camelcase
    step
  };
};

export default trackCheckoutStep;

/**
 * trackCheckoutStep HOC tracks the "Checkout Step Viewed | Completed" events
 * @name trackCheckoutStep
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
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

import track from "./track";
import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackCheckout HOC tracks the "Checkout Started" event
 * @name trackCheckout
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) =>
  // eslint-disable-next-line no-unused-vars
  track(({ router }, state, functionArgs) => {
    const { cart, action } = (functionArgs && functionArgs[0]) || [];
    const { checkout: { summary }, items, shop } = cart;
    const products = [];

    items.forEach((item) => {
      products.push(getCartItemTrackingData(item));
    });

    return {
      action,
      revenue: summary.itemTotal.amount,
      shipping: summary.fulfillmentTotal,
      tax: summary.taxTotal,
      currency: shop.currency.code,
      products
    };
  }, options);

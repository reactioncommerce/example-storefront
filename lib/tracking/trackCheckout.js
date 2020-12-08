import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackCheckout tracks the "Checkout Started" event
 * @name trackCheckout
 * @param {Object} payload options to supply to tracking event
 * @returns {Object} - Object with the data to be tracked
 */
const trackCheckout = (payload) => {
  const { cart, locale } = payload;
  const { checkout: { summary }, items, shop } = cart;
  const products = [];

  items.forEach((item) => {
    products.push(getCartItemTrackingData(item, locale));
  });

  return {
    revenue: summary.itemTotal.amount,
    // TODO: modify with discounts
    value: summary.itemTotal.amount,
    shipping: summary.fulfillmentTotal,
    tax: summary.taxTotal,
    currency: shop.currency.code,
    products
  };
};

export default trackCheckout;

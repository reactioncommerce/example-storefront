import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackCheckout HOC tracks the "Checkout Started" event
 * @name trackCheckout
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
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
    shipping: summary.fulfillmentTotal,
    tax: summary.taxTotal,
    currency: shop.currency.code,
    products
  };
};

export default trackCheckout;

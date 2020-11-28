
import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackCartItems tracks an items in the cart
 * @name trackCartItem
 * @param {Object} payload data to supply to tracking
 * @returns {Object} - data to be tracked
 */
const trackCartItem = (payload) => {
  const { cartItems, cartId, url, query } = payload;
  let data = {};

  if (Array.isArray(cartItems)) {
    const products = [];
    cartItems.forEach((item) => {
      products.push(getCartItemTrackingData((item.node || item), query));
    });

    data = {
      cart_id: cartId, // eslint-disable-line camelcase
      products
    };

  } else {
    data = {
      ...getCartItemTrackingData(cartItems, query)
    };
  }

  return {
    ...data,
    url
  };
};

export default trackCartItem;

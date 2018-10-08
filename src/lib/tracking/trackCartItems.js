import track from "./track";
import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackCartItems HOC tracks an items in the cart
 * @name trackCartItem
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (
  track((state, functionArgs) => {
    const { cartItems, action } = (functionArgs && functionArgs[0]) || [];
    let data = {};

    if (cartItems) {
      if (Array.isArray(cartItems)) {
        const products = [];
        cartItems.forEach((item) => {
          products.push(getCartItemTrackingData(item));
        });
        data = {
          products
        };
      } else {
        data = {
          ...getCartItemTrackingData(cartItems)
        };
      }
    }

    return {
      action,
      ...data
    };
  }, options)
);

import track from "./track";
import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackCartItems HOC tracks an items in the cart
 * @name trackCartItem
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) => (
  track(({ router }, state, functionArgs) => {
    const { cartItems, cartId, action } = (functionArgs && functionArgs[0]) || [];
    let data = {};

    if (Array.isArray(cartItems)) {
      const products = [];
      cartItems.forEach((item) => {
        products.push(getCartItemTrackingData(item.node || item));
      });

      data = {
        cart_id: cartId, // eslint-disable-line camelcase
        products
      };

      // If the router is provided as a prop, set the url of the product to the current path
      if (router) {
        data.url = router.asPath;
      }
    } else {
      data = {
        ...getCartItemTrackingData(cartItems)
      };
    }

    return {
      action,
      ...data
    };
  }, options)
);

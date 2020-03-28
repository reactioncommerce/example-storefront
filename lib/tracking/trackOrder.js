import getCartItemTrackingData from "./utils/getCartItemTrackingData";
import track from "./track";

/**
 * trackOrder HOC tracks the "Order Complete" event
 * @name trackOrder
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
export default (options) =>
  // eslint-disable-next-line no-unused-vars
  track(({ router }, state, functionArgs) => {
    const {
      action,
      orders
    } = (functionArgs && functionArgs[0]) || [];

    const { fulfillmentGroups, referenceId, shop } = orders[0];
    // currently only supporting one fulfillment group
    const { items: { nodes: items }, summary } = fulfillmentGroups[0];
    const products = [];

    items.forEach((item) => {
      products.push(getCartItemTrackingData(item));
    });

    const data = {
      action,
      currency: shop.currency.code,
      order_id: referenceId, // eslint-disable-line camelcase
      revenue: summary.itemTotal.amount,
      shipping: summary.fulfillmentTotal.amount,
      tax: summary.taxTotal.amount,
      products
    };

    return data;
  }, options);

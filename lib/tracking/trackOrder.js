import getCartItemTrackingData from "./utils/getCartItemTrackingData";

/**
 * trackOrder HOC tracks the "Order Complete" event
 * @name trackOrder
 * @param {Object} options options to supply to tracking HOC
 * @returns {React.Component} - component
 */
const trackOrder = (payload) => {
  const { orders, locale } = payload;

  const { fulfillmentGroups, referenceId, shop } = orders[0];
  // currently only supporting one fulfillment group
  const { items: { nodes: items }, summary } = fulfillmentGroups[0];
  const products = [];

  items.forEach((item) => {
    products.push(getCartItemTrackingData(item, locale));
  });

  const data = {
    currency: shop.currency.code,
    // TODO: modify with discounts
    subtotal: summary.itemTotal.amount,
    total: summary.total.amount,
    order_id: referenceId, // eslint-disable-line camelcase
    revenue: summary.itemTotal.amount,
    shipping: summary.fulfillmentTotal.amount,
    tax: summary.taxTotal.amount,
    products
  };

  return data;
};

export default trackOrder;

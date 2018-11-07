/**
 * Determines if there is any fulfillment group without a shipping address
 *
 * @param {Array} fulfillmentGroups - An array of available fulfillment groups
 * @returns {Boolean} - true if at least one fulfillment group does not have
 * a shipping address set, false otherwise.
 */
export function isShippingAddressSet(fulfillmentGroups) {
  const groupWithoutAddress = fulfillmentGroups.find((group) => {
    const shippingGroup = group.type === "shipping";
    return shippingGroup && group.data.shippingAddress;
  });

  return groupWithoutAddress;
}

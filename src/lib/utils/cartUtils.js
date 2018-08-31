/**
 * Determines if at least one fulfillment method has been set for the
 * provided fulfillment groups.
 *
 * @param {Array} fulfillmentGroups - An array of available fulfillment groups
 * @returns {Boolean} - true if at least one fulfillment method has been set,
 * false otherwise.
 */
export function isFulfillmentOptionSet(fulfillmentGroups) {
  const groupWithoutAddress = fulfillmentGroups.find((group) => {
    const shippingGroup = group.type === "shipping";
    return shippingGroup && group.data.shippingAddress;
  });

  return groupWithoutAddress;
}

/**
 * Determines if at least one payment method has been selected by the user
 *
 * @param {Array} paymentMethods - An array of available and active payment methods
 * @returns {Boolean} true if a payment method has been selected, false otherwise.
 */
export function isPaymentMethodSet(paymentMethods) {
  const setPaymentMethod = paymentMethods.find((payment) => payment.data.displayName);

  return setPaymentMethod;
}

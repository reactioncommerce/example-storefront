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

/**
 * Filters an address object so that it only contain props that have a corresponding form field.
 *
 * @param {Object} address - a shipping address object
 * @returns {Object} The filtered shipping address object
 */
export function adaptAddressToFormFields(address) {
  const { fullName, address1, address2, city, country, phone, postal, region } = address;
  const [firstName, lastName] = fullName.split(" ");

  return {
    address1,
    address2,
    city,
    country,
    firstName,
    lastName,
    phone,
    postal,
    region
  };
}

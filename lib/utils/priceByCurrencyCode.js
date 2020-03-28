/**
 * Determines the pricing a product given a currency code.
 *
 * @param {String} currencyCode - the shop's set currency code, i.e. "USD"
 * @param {Array} pricing - An array of pricing objects with different currencies.
 * @returns {Object} - pricing object, or null if none found.
 */
export default function priceByCurrencyCode(currencyCode, pricing) {
  const _pricing = pricing.find((price) => price.currency.code === currencyCode);

  return _pricing || null;
}

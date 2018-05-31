import keyMirror from "keymirror";

export const INVENTORY_STATUS = keyMirror({
  BACKORDER: null,
  BESTSELLER: null,
  LOW_QUANTITY: null,
  SOLD_OUT: null,
  SALE: null
});


/**
 * Determines a product's inventory status
 *
 * @param {Object} product - The product
 * @returns {Object} - The computed product status
 */
export function inventoryStatus(product) {
  let status = null;

  if (product.isSoldOut && product.isBackorder) {
    status = { type: INVENTORY_STATUS.BACKORDER, label: "Backorder" };
  } else if (product.isSoldOut && !product.isBackorder) {
    status = { type: INVENTORY_STATUS.SOLD_OUT, label: "Sold Out" };
  } else if (product.isLowQuantity && !product.isSoldOut) {
    status = { type: INVENTORY_STATUS.LOW_QUANTITY, label: "Low Inventory" };
  }

  return status;
}

/**
 * Determines if a product has low inventory.
 *
 * @param {Object} product - The product
 * @returns {Boolean} - Indicates whether the product has low inventory
 */
export function isProductLowQuantity(product) {
  return product.isLowQuantity && !product.isSoldOut;
}

/**
 * Determines the pricing a product given a currency code.
 *
 * @param {String} currencyCode - the shop's set currency code, i.e. "USD"
 * @param {Array} pricing - An array of pricing objects with different currencies.
 * @returns {Object} - pricing object, or null if none found.
 */
export function priceByCurrencyCode(currencyCode, pricing) {
  const _pricing = pricing.find((price) => price.currency.code === currencyCode);

  return _pricing || null;
}

/**
 * Find a variant or option by _id
 *
 * @param {Array} variants - A list of variants or options
 * @param {String} variantId - _id of target variant or option
 * @returns {Object} - found variant or option or null if none found.
 */
export function variantOrOptionById(variants, variantId) {
  const _variant = variants.find((variant) => variant._id === variantId);

  return _variant || null;
}



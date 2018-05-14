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

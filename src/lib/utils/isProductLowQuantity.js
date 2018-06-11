/**
 * Determines if a product has low inventory.
 *
 * @param {Object} product - The product
 * @returns {Boolean} - Indicates whether the product has low inventory
 */
export default function isProductLowQuantity(product) {
  return product.isLowQuantity && !product.isSoldOut;
}

/**
 * Determines if a product is on sale.
 * TODO: this is a placeholder, as we don't have "Best Seller" at this moment
 * https://github.com/reactioncommerce/reaction-next-starterkit/issues/130
 *
 * @param {Object} product - The product
 * @returns {Boolean} - Indicates whether the product is on sale
 */
export default function isProductOnSale(product) {
  // This is a placeholder.
  // Remove the placeholder check and only `return product.isOnSale`
  // when that functionality if available
  const placeholder = true;
  if (placeholder) {
    return false;
  }

  return product.isOnSale;
}

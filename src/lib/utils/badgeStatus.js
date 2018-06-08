import BADGE_TYPES from "./badgeTypes";

/**
 * Determines a product's badge status
 *
 * @param {Object} product - The product
 * @returns {Object} - The computed product status
 */
export function badgeStatus(product) {
  let status;

  if (product.isSoldOut && product.isBackorder) {
    status = { type: BADGE_TYPES.BACKORDER, label: "Backorder" };
  } else if (product.isSoldOut && !product.isBackorder) {
    status = { type: BADGE_TYPES.SOLD_OUT, label: "Sold Out" };
  } else if (product.isOnSale) {
    status = { type: BADGE_TYPES.SALE, label: "Sale" };
  } else if (product.isLowQuantity && !product.isSoldOut) {
    status = { type: BADGE_TYPES.LOW_QUANTITY, label: "Low Inventory" };
  } else if (product.isBestSeller) {
    status = { type: BADGE_TYPES.BESTSELLER, label: "Best Seller" };
  }

  return status;
}

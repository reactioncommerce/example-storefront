/**
 * Find a variant by _id
 *
 * @param {Array} variants - A list of variants
 * @param {String} variantId - _id of target variant
 * @returns {Object} - target variant or null if none found.
 */
export default function variantById(variants, variantId) {
  const _variant = Array.isArray(variants) && variants.find((variant) => variant._id === variantId);

  return _variant || null;
}



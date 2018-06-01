/**
 * Transform a variant object into a partial representation of the segment Proeduct Viewed schema
 * @name getVariantTrackingData
 * @param {Object} variant Project variant
 * @returns {Object} Data sutable for trackign a variant
 */
export default function getVariantTrackingData(variant) {
  return {
    action: "Product Viewed",
    variant: variant.variantId,
    price: variant.price,
    quantity: 1,
    position: variant.index,
    value: variant.price
  };
}

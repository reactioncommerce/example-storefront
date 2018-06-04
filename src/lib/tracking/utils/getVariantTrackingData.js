/**
 * Transform a variant object into a partial representation of the Segment product schema
 * @name getVariantTrackingData
 * @param {Object} data Object containing data for tracking a variant
 * @param {Object} data.variant Object of the selected variant
 * @param {Object} [data.optionId] Id of the selected option
 * @param {Object} [data.product] Parent product of the selected variant
 * @returns {Object} Data sutable for trackign a variant
 */
export default function getVariantTrackingData({ variant, optionId, product }) {
  let data = variant;
  let imageURL;

  // If an option id is provided, use the option instead of the top level variant
  if (optionId) {
    const foundOption = variant.options.find((option) => (
      option._id === optionId
    ));

    if (foundOption) {
      data = foundOption;
    }
  }

  // If a product object is provided with media,
  // then attempt to find some media for this variant
  if (product && Array.isArray(product.media)) {
    const foundMedia = product.media.find((media) => (
      media.variantId === data.variantId
    ));

    if (foundMedia) {
      imageURL = foundMedia.URLs.original;
    }
  }

  return {
    variant: variant.variantId,
    price: variant.price,
    quantity: 1,
    position: variant.index,
    value: variant.price,
    image_url: imageURL // eslint-disable-line camelcase
  };
}

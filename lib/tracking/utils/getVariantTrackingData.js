import { decodeOpaqueId } from "lib/utils/decoding";

/**
 * Transform a variant object into a partial representation of the Segment product schema
 * @name getVariantTrackingData
 * @param {Object} data Object containing data for tracking a variant
 * @param {Object} data.product Parent product of the selected variant
 * @param {Object} data.variant Object of the selected variant
 * @param {Object} [data.optionId] Id of the selected option
 * @returns {Object} Data suitable for tracking a variant
 */
export default function getVariantTrackingData({ product, router, variant, optionId }) {
  let data = { ...variant };
  const cartId = data.cart_id ? { cart_id: data.cart_id } : {}; // eslint-disable-line camelcase
  let imageURL;
  let price;
  const quantity = data.quantity || 1;
  let url;
  const { id: variantId } = decodeOpaqueId(data._id);

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

  if (product) {
    if (product.shop) {
      const shopCurrency = product.shop.currency.code;
      const foundPricing = data.pricing.find((pricing) => pricing.currency.code === shopCurrency);

      if (foundPricing) {
        price = foundPricing.price; // eslint-disable-line prefer-destructuring
      }
    }

    url = router.asPath;
  }

  return {
    ...cartId,
    variant: variantId,
    price,
    quantity,
    position: data.index,
    value: price,
    image_url: imageURL, // eslint-disable-line camelcase
    url
  };
}

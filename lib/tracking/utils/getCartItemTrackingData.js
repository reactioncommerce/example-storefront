/**
 * Transform a CartItem object into a partial representation of the Segment product schema
 * @name getCartItemTrackingData
 * @param {Object} cartItem Object of the `CartItem` type
 * @returns {Object} Data suitable for tracking a `CartItem`
 */
export default function getCartItemTrackingData(cartItem, locale) {
  const variant = { ...cartItem };
  let cartId = {};

  if (variant.cart_id) {
    cartId = { cart_id: variant.cart_id }; // eslint-disable-line camelcase
  }

  return {
    ...cartId,
    product_id: variant.productConfiguration.productId, // eslint-disable-line camelcase
    sku: variant.sku,
    category: (variant.productTags.nodes.length && variant.productTags.nodes[0].name) || undefined,
    name: variant.title,
    brand: variant.productVendor,
    variant: variant.variantTitle,
    price: variant.price.amount,
    quantity: variant.quantity,
    // TODO: get somehow this data - imageURLs is empty
    image_url: variant.imageURLs && variant.imageURLs.original, // eslint-disable-line camelcase
    // TODO: get somehow this data if not possible keep only the product slug
    url: `/${locale}/${variant.productSlug}`
  };
}

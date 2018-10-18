import routes from "routes";
import { decodeOpaqueId } from "lib/utils/decoding";

/**
 * Transform a CartItem object into a partial representation of the Segment product schema
 * @name getCartItemTrackingData
 * @param {Object} cartItem Object of the `CartItem` type
 * @returns {Object} Data suitable for tracking a `CartItem`
 */
export default function getCartItemTrackingData(cartItem) {
  const variant = { ...cartItem };
  let url;

  const { id } = decodeOpaqueId(variant._id);
  const route = routes.findAndGetUrls("product", { slugOrId: variant.productSlug || id });

  if (route && route.urls) {
    url = route.urls.as;
  }

  let cartId = {};
  if (variant.cart_id) {
    cartId = { cart_id: variant.cart_id }; // eslint-disable-line camelcase
  }

  return {
    ...cartId,
    product_id: variant.productConfiguration.productVariantId, // eslint-disable-line camelcase
    sku: variant.sku,
    category: (variant.productTags.nodes.length && variant.productTags.nodes[0].name) || undefined,
    name: variant.title,
    brand: variant.productVendor,
    variant: variant.variantTitle,
    price: variant.price.amount,
    quantity: variant.quantity,
    image_url: variant.imageURLs && variant.imageURLs.original, // eslint-disable-line camelcase
    url
  };
}

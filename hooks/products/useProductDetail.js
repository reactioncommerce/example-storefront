import { useState } from "react";
import { isWidthUp } from "@material-ui/core/withWidth";
import Router from "translations/i18nRouter";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import useStores from "hooks/useStores";
import useWidth from "hooks/useWidth";
import useTrackerEvents from "hooks/analytics/useTrackerEvents";

/**
 * Hook to process product details
 * @param {Function} addItemsToCart Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
 * @param {String} currencyCode currencyCode
 * @param {Object} product product
 * @returns {Object} the product details functions
 */
export default function useProductDetail({ addItemsToCart, currencyCode, product }) {
  const width = useWidth();
  const { uiStore, routingStore } = useStores();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const {
    trackProductViewedEvent,
    trackProductAddedEvent,
    trackCartViewedEvent
  } = useTrackerEvents();
  const { openCartWithTimeout } = uiStore;

  const selectVariant = (variant, optionId) => {
    const firstOption = variant?.options && variant.options[0];
    const selectedVariantOption = optionId && variantById(variant.options, optionId);
    const variantOrOptionId = optionId || firstOption?._id || variant._id;
    const url = `/product/${product.slug}/${variantOrOptionId}`;

    setSelectedVariant(selectedVariantOption || firstOption || variant);
    // TODO: delete this
    uiStore.setPDPSelectedVariantId(variant._id, variantOrOptionId);
    Router.replace("/product/[...slugOrId]", url);
    // pass the url here because we have to wait for the route transition from Router.replace();
    // if that page is not pre-rendered, it's gonna take a while to be fully loaded
    trackProductViewedEvent({ product, variant, optionId: variantOrOptionId, url });
  };

  // Called when the add to cart button is clicked
  const handleAddToCartClick = async (quantity) => {
    if (selectedVariant && selectedVariant?.pricing) {
      // Get the price for the currently selected variant or variant option
      const price = priceByCurrencyCode(currencyCode, selectedVariant.pricing);

      // TODO: useCart
      // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
      const { data } = await addItemsToCart([
        {
          price: {
            amount: price.price,
            currencyCode
          },
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariant.variantId // Pass the variantId, not to be confused with _id
          },
          quantity
        }
      ]);

      if (data) {
        // The response data will be in either `createCart` or `addCartItems` prop
        // depending on the type of user, either authenticated or anonymous.
        const { cart } = data.createCart || data.addCartItems;
        const { edges: items } = cart.items;

        // TODO: check url
        trackProductAddedEvent({
          product,
          variant: {
            ...selectedVariant,
            cart_id: cart._id, // eslint-disable-line camelcase
            quantity
          },
          optionId: selectedVariant._id
        });


        // The mini cart popper will open automatically after adding an item to the cart,
        // therefore, a CART_VIEWED event is published.
        // debugger // eslint-disable-line
        trackCartViewedEvent({ cartItems: items, cartId: cart._id }); // eslint-disable-line camelcase

      }
    }
    if (isWidthUp("md", width)) {
      // Open the cart, and close after a 3 second delay
      openCartWithTimeout(3000);
    }
  };

  // Determines a product's price given the shop's currency code. It will
  // use the selected option if available, otherwise it will use the selected variant.
  const determineProductPrice = () => {
    let productPrice = {};

    if (selectedVariant && selectedVariant?.pricing) {
      productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
    }

    return productPrice;
  };

  // Set the default media as the top-level product's media
  // (all media on all variants and objects)
  let pdpMediaItems = product.media;

  // If we have a selected variant (we always should)
  // check to see if media is available, and use media instead
  // Revert to original media if variant doesn't have specific media
  if (selectedVariant) {
    if (selectedVariant && selectedVariant?.media && selectedVariant.media.length) {
      pdpMediaItems = selectedVariant.media;
    }
  }

  return {
    selectVariant,
    determineProductPrice,
    handleAddToCartClick,
    width,
    uiStore,
    routingStore,
    currencyCode,
    product,
    pdpMediaItems
  };
}

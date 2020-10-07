import { isWidthUp } from "@material-ui/core/withWidth";
import Router from "translations/i18nRouter";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import useStores from "hooks/useStores";
import useWidth from "hooks/useWidth";
import useProductViewedEvent from "hooks/analytics/useProductViewedEvent";

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
  const trackProductViewedEvent = useProductViewedEvent();
  const { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId } = uiStore;

  const selectVariant = (variant, optionId) => {
    // Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }

    const url = `/product/${product.slug}/${selectOptionId || variantId}`;
    trackProductViewedEvent({ product, variant, optionId: selectOptionId, url });
    uiStore.setPDPSelectedVariantId(variantId, selectOptionId);
    Router.replace("/product/[...slugOrId]", url);
  };

  // Called when the add to cart button is clicked
  const handleAddToCartClick = async (quantity) => {
    // Get selected variant or variant option
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
    const selectedVariantOrOption = selectedOption || selectedVariant;

    if (selectedVariantOrOption) {
      // Get the price for the currently selected variant or variant option
      const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

      // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
      await addItemsToCart([
        {
          price: {
            amount: price.price,
            currencyCode
          },
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with _id
          },
          quantity
        }
      ]);
    }
    if (isWidthUp("md", width)) {
      // Open the cart, and close after a 3 second delay
      openCartWithTimeout(3000);
    }
  };

  // Determines a product's price given the shop's currency code. It will
  // use the selected option if available, otherwise it will use the selected variant.
  const determineProductPrice = () => {
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    let productPrice = {};

    if (pdpSelectedOptionId && selectedVariant) {
      const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
      productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
    } else if (!pdpSelectedOptionId && selectedVariant) {
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
  const selectedVariant = product.variants.find((variant) => variant._id === pdpSelectedVariantId);
  if (selectedVariant) {
    if (selectedVariant.media && selectedVariant.media.length) {
      pdpMediaItems = selectedVariant.media;
    }

    // If we have a selected option, do the same check
    // Will revert to variant check if no option media is available
    if (Array.isArray(selectedVariant.options) && selectedVariant.options.length) {
      const selectedOption = selectedVariant.options.find((option) => option._id === pdpSelectedOptionId);
      if (selectedOption) {
        if (selectedOption.media && selectedOption.media.length) {
          pdpMediaItems = selectedOption.media;
        }
      }
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

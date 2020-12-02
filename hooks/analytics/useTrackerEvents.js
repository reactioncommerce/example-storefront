import { useAnalytics } from "use-analytics";
import { useRouter } from "next/router";
import TRACKING from "lib/tracking/constants";
import trackProduct from "lib/tracking/trackProduct";
import trackCartItems from "lib/tracking/trackCartItems";

const {
  PRODUCT_VIEWED,
  PRODUCT_ADDED,
  CART_VIEWED
} = TRACKING;

/**
 * track events to different providers
 * @returns {Object} useTrackerEvents
 */
export default function useTrackerEvents() {
  const { track } = useAnalytics();
  const { asPath: url, query } = useRouter();

  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-viewed
  const trackProductViewedEvent = (payload) => {
    const data = trackProduct(payload);
    track(PRODUCT_VIEWED, data);
  };

  // TODO: add coupon code
  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-added
  const trackProductAddedEvent = (payload) => {
    const data = trackProduct(payload);
    track(PRODUCT_ADDED, data);
  };

  // TODO: add url variant and url_media variant
  // https://segment.com/docs/connections/spec/ecommerce/v2/#cart-viewed
  const trackCartViewedEvent = (payload) => {
    const data = trackCartItems({ ...payload, url, locale: query.lang });
    track(CART_VIEWED, data);
  };

  return {
    trackProductViewedEvent,
    trackProductAddedEvent,
    trackCartViewedEvent
  };
}

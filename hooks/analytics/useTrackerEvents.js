import { useAnalytics } from "use-analytics";
import TRACKING from "lib/tracking/constants";
import trackProduct from "lib/tracking/trackProduct";
import trackCartItems from "lib/tracking/trackCartItems";
import { useRouter } from "next/router";

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
  const router = useRouter();
  console.log(router);

  const trackProductViewedEvent = (payload) => {
    const data = trackProduct(payload);
    track(PRODUCT_VIEWED, data);
  };

  const trackProductAddedEvent = (payload) => {
    const data = trackProduct({ ...payload, url });
    track(PRODUCT_ADDED, data);
  };

  const trackCartViewedEvent = (payload) => {
    const data = trackCartItems({ ...payload, url, query });
    track(CART_VIEWED, data);
  };

  return {
    trackProductViewedEvent,
    trackProductAddedEvent,
    trackCartViewedEvent
  };
}

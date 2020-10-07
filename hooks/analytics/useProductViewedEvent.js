import { useAnalytics } from "use-analytics";
import TRACKING from "lib/tracking/constants";
import trackProduct from "lib/tracking/trackProduct";

const { PRODUCT_VIEWED } = TRACKING;

/**
 * track product
 * @returns {Object} useTrackProduct
 */
export default function useProductViewedEvent() {
  const { track } = useAnalytics();

  const trackProductViewedEvent = (payload) => {
    const data = trackProduct(payload);
    track(PRODUCT_VIEWED, data);
  };

  return trackProductViewedEvent;
}

import { useRouter } from "next/router";
import { useAnalytics } from "use-analytics";
import trackProduct from "lib/tracking/trackProduct";


/**
 * tracking events visits
 *
 * @param {String} data - the props of the page
 * @returns {Object} useTrackingEvents
 */
export default function useTrackingEvents() {
  const router = useRouter();
  const { track } = useAnalytics();

  const callTracking = (payload) => {
    const dataProduct = trackProduct(payload, router);
    track(payload.action, dataProduct);
  };

  return callTracking;
}

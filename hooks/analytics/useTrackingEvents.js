import { useRouter } from "next/router";
import { useAnalytics } from "use-analytics";


/**
 * tracking events
 * @returns {Object} useTrackingEvents
 */
export default function useTrackingEvents() {
  const router = useRouter();
  const { track } = useAnalytics();

  const callTracking = (payload, processDataFunc) => {
    const dataProduct = processDataFunc(payload, router);
    track(payload.action, dataProduct);
  };

  return callTracking;
}

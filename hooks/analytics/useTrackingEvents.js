import { useAnalytics } from "use-analytics";


/**
 * tracking events
 * @returns {Object} useTrackingEvents
 */
export default function useTrackingEvents() {
  const { track } = useAnalytics();

  const callTracking = (payload, processDataFunc) => {
    const dataProduct = processDataFunc(payload);
    track(payload.action, dataProduct);
  };

  return callTracking;
}

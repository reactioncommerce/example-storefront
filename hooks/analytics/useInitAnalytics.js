import { useEffect } from "react";
import { useRouter } from "next/router";
import analytics from "lib/analytics";

/**
 * Initialize the analytic provider
 * @returns {Object} useInitAnalytics
 */
export default function useInitAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== "undefined") {
        setTimeout(() => {
          analytics.page({
            path: url
          });
        }, 1000);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return analytics;
}

import Analytics from "analytics";
import segmentPlugin from "@analytics/segment";
import googleAnalytics from "@analytics/google-analytics";

const analytics = Analytics({
  app: "example-storefront",
  plugins: [
    segmentPlugin({
      writeKey: process.env.SEGMENT_ANALYTICS_WRITE_KEY
    }),
    googleAnalytics({
      trackingId: process.env.GOOGLE_ANALYTICS_ID
    })
  ]
});

/** Disable plugins that it's not configured properly */
if (process.env.GOOGLE_ANALYTICS_ID === "") analytics.plugins.disable(["google-analytics"]);
if (process.env.SEGMENT_ANALYTICS_WRITE_KEY === "") analytics.plugins.disable(["segment"]);


export default analytics;

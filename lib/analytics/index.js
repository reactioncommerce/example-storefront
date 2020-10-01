import Analytics from "analytics";
import segmentPlugin from "@analytics/segment";
import googleAnalytics from "@analytics/google-analytics";

const plugins = [];

if (process.env.GOOGLE_ANALYTICS_ID) {
  plugins.push(googleAnalytics({
    trackingId: process.env.GOOGLE_ANALYTICS_ID
  }));
}

if (process.env.SEGMENT_ANALYTICS_WRITE_KEY) {
  plugins.push(segmentPlugin({
    writeKey: process.env.SEGMENT_ANALYTICS_WRITE_KEY
  }));
}

const analytics = Analytics({
  app: "example-storefront",
  plugins
});


export default analytics;

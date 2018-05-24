import getConfig from "next/config";
import * as snippet from "@segment/snippet";

/**
 * Dispatch tracking data to segment
 * @name dispatch
 * @ignore
 * @param {Object} data Arguments supplied by tracking library
 * @param {String} data.action String value used as the first param to analytics.track()
 * @returns {undefined} No Return
 */
export function dispatch(data) {
  // Workaround for not being able to use object rest spread
  const { action } = data;
  delete data.action;

  window && window.analytics.track(action, data);
}

/**
 * Render string script
 * @returns {String} String script to be included in the document head
 */
export function renderScript() {
  const { publicRuntimeConfig } = getConfig();
  const opts = {
    apiKey: publicRuntimeConfig.segmentAnalyticsWriteKey,
    page: true // Set this to `false` if you want to manually fire `analytics.page()` from within your pages.
  };

  if (process.env.NODE_ENV === "development") {
    return snippet.max(opts);
  }

  return snippet.min(opts);
}

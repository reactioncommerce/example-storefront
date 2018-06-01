import getConfig from "next/config";

/**
 * Dispatch method
 * @name dispatch
 * @ignore
 * @param {Object} data Arguments supplied by tracking library
 * @returns {undefined} No Return
 */
export function dispatch(data) {
  // Example that works with google tag manager
  window && window.dataLayer && window.dataLayer.push(data);
}

/**
 * Render string script
 * @returns {String} String script to be included in the document head
 */
export function renderScript() {
  // Example: Use an API key from config
  // An API key variable may be set in `publicRuntimeConfig` object of the next.config.js
  const { publicRuntimeConfig } = getConfig();
  const { apiKey } = publicRuntimeConfig; // eslint-disable-line no-unused-vars

  // Return a javascript string that will be included in the HEAD of the rendered HTML document
  return "STRING_SCRIPT";
}

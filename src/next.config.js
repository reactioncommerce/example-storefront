const appConfig = require("./config");
const path = require('path');

module.exports = {
  /**
   * `serverRuntimeConfig` is available in browser code, ONLY when run on the server
   * @example
   * import getConfig from "next/config";
   * const { serverRuntimeConfig } = getConfig();
   */
  serverRuntimeConfig: {
    graphqlUrl: appConfig.INTERNAL_GRAPHQL_URL
  },
  /**
   * `publicRuntimeConfig` is available in browser code, even when run on the server
   * @example
   * import getConfig from "next/config";
   * const { publicRuntimeConfig } = getConfig();
   */
  publicRuntimeConfig: {
    canonicalUrl: appConfig.CANONICAL_URL,
    graphqlUrl: appConfig.EXTERNAL_GRAPHQL_URL,
    segmentAnalytics: {
      skipMinimize: appConfig.SEGMENT_ANALYTICS_SKIP_MINIMIZE,
      writeKey: appConfig.SEGMENT_ANALYTICS_WRITE_KEY
    },
    stripePublicApiKey: appConfig.STRIPE_PUBLIC_API_KEY,
    enableSPARouting: appConfig.ENABLE_SPA_ROUTING
  },
  // NextJS builds to `/src/.next` by default. Change that to `/build/app`
  distDir: "../build/app",
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: "graphql-tag/loader",
      exclude: ["/node_modules/", "/.next/"],
      enforce: "pre"
    });

    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      type: "javascript/auto"
    });

    // Duplicate versions of the styled-components package were being loaded, this config removes the duplication.
    // It creates an alias to import the es modules version of the styled-components package.
    // This is a workaround until the root issue is resolved: https://github.com/webpack/webpack/issues/9329
    webpackConfig.resolve.alias["styled-components"] = "styled-components/dist/styled-components.browser.esm.js";

    webpackConfig.resolve.alias["components"] = path.join(__dirname, 'components');
    webpackConfig.resolve.alias["containers"] = path.join(__dirname, 'containers');
    webpackConfig.resolve.alias["context"] = path.join(__dirname, 'context');
    webpackConfig.resolve.alias["custom"] = path.join(__dirname, 'custom');
    webpackConfig.resolve.alias["hocs"] = path.join(__dirname, 'hocs');
    webpackConfig.resolve.alias["hocs"] = path.join(__dirname, 'hocs');
    webpackConfig.resolve.alias["hooks"] = path.join(__dirname, 'hooks');
    webpackConfig.resolve.alias["lib"] = path.join(__dirname, 'lib');
    webpackConfig.resolve.alias["pages"] = path.join(__dirname, 'pages');
    webpackConfig.resolve.alias["public"] = path.join(__dirname, 'public');
    webpackConfig.resolve.alias["static"] = path.join(__dirname, 'static');
    webpackConfig.resolve.alias["serverUtils"] = path.join(__dirname, 'serverUtils');
    webpackConfig.resolve.alias["static-translations"] = path.join(__dirname, 'static-translations');
    webpackConfig.resolve.alias["routes"] = path.join(__dirname, 'routes');
    webpackConfig.resolve.alias["utils"] = path.join(__dirname, 'utils');
    webpackConfig.resolve.alias["staticUtils"] = path.join(__dirname, 'staticUtils');


    return webpackConfig;
  }
};

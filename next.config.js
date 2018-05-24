const initExport = {
  /**
   * Server config will be available as serverRuntimeConfig
   * @example
   * import getConfig from "next/config";
   * const { serverRuntimeConfig } from "getConfig()";
   */
  serverRuntimeConfig: {
    dev: process.env.NODE_ENV !== "production",
    appPath: process.env.NODE_ENV === "production" ? "./build/app" : "./src",
    graphqlUrl: process.env.INTERNAL_GRAPHQL_URL
  },
  /**
   * Browser and server config will be available as publicRuntimeConfig and serverRuntimeConfig
   * @example
   * @inject("uiStore")
   * class MyComponent extends React.Component {
   *   render() {
   *     console.log(this.props.uiStore.appConfig.publicRuntimeConfig);
   *     return <span>Hello</span>;
   *   }
   * }
   * @example
   * import getConfig from "next/config";
   * const { serverRuntimeConfig, publicRuntimeConfig } from "getConfig()";
   */
  publicRuntimeConfig: {
    externalAssetsUrl: process.env.EXTERNAL_ASSETS_URL,
    graphqlUrl: process.env.EXTERNAL_GRAPHQL_URL,
    segmentAnalyticsWriteKey: process.env.SEGMENT_ANALYTICS_WRITE_KEY,
    placeholderImageUrls: {
      galleryFeatured: process.env.PLACEHOLDER_IMAGE_URL_GALLERY,
      productGrid: process.env.PLACEHOLDER_IMAGE_URL_GRID
    }
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: "graphql-tag/loader",
      exclude: ["/node_modules/", "/.next/"],
      enforce: "pre"
    });

    return config;
  }
};

/* eslint-enable global-require */
module.exports = initExport;

const initExport = {
  /**
   * Server config will be available as serverRuntimeConfig
   * @example
   * import getConfig from "next/config";
   * const { serverRuntimeConfig } = getConfig();
   */
  serverRuntimeConfig: {
    dev: process.env.NODE_ENV !== "production",
    appPath: process.env.NODE_ENV === "production" ? "./build/app" : "./src",
    graphqlUrl: process.env.INTERNAL_GRAPHQL_URL,
    faviconUrl: process.env.FAVICON_URL
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
   * const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
   */
  publicRuntimeConfig: {
    externalAssetsUrl: process.env.EXTERNAL_ASSETS_URL,
    graphqlUrl: process.env.EXTERNAL_GRAPHQL_URL,
    segmentAnalytics: {
      skipMinimize: process.env.SEGMENT_ANALYTICS_SKIP_MINIMIZE === "true", // Convert to a Boolean
      writeKey: process.env.SEGMENT_ANALYTICS_WRITE_KEY
    },
    placeholderImageUrls: {
      galleryFeatured: process.env.PLACEHOLDER_IMAGE_URL_GALLERY,
      productGrid: process.env.PLACEHOLDER_IMAGE_URL_GRID
    },
    keycloakConfig: {
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      url: process.env.KEYCLOAK_URL,
      redirectUri: process.env.KEYCLOAK_REDIRECT_URI
    },
    stripePublicApiKey: process.env.STRIPE_PUBLIC_API_KEY
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

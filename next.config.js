const initExport = {
  /**
   * Server config will be available as serverRuntimeConfig
   * @example
   * import getConfig from "next/config";
   * const { serverRuntimeConfig } = getConfig();
   */
  serverRuntimeConfig: {
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
   * const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
   */
  publicRuntimeConfig: {
    canonicalUrl: process.env.CANONICAL_URL,
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
    stripePublicApiKey: process.env.STRIPE_PUBLIC_API_KEY,
    enableSPARouting: process.env.ENABLE_SPA_ROUTING !== "false" // Disable SPA routing if explicitly string "false"
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

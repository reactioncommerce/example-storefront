const initExport = {
  serverRuntimeConfig: { // Will only be available on the server side
    dev: process.env.NODE_ENV !== "production",
    appPath: process.env.NODE_ENV === "production" ? "./build/app" : "./src",
    graphqlUrl: process.env.INTERNAL_GRAPHQL_URL
  },
  publicRuntimeConfig: { // Will be available on both server and client
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

const initExport = {
  serverRuntimeConfig: { // Will only be available on the server side
    dev: process.env.NODE_ENV !== "production",
    appPath: process.env.NODE_ENV === "production" ? "./build/app" : "./src",
    graphqlUrl: process.env.INTERNAL_GRAPHQL_URL
  },
  publicRuntimeConfig: { // Will be available on both server and client
    externalAssetsUrl: process.env.EXTERNAL_ASSETS_URL,
    graphqlUrl: process.env.EXTERNAL_GRAPHQL_URL,
    placeholderImageUrls: {
      galleryFeatured: "/resources/placeholder.gif",
      productGrid: "/resources/placeholder.gif"
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

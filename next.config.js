const initExport = {
  serverRuntimeConfig: { // Will only be available on the server side
    dev: process.env.NODE_ENV !== "production",
    appPath: process.env.NODE_ENV === "production" ? "./build/app" : "./src",
    graphqlUrl: process.env.INTERNAL_GRAPHQL_URL
  },
  publicRuntimeConfig: { // Will be available on both server and client
    graphqlUrl: process.env.EXTERNAL_GRAPHQL_URL,
    meteorToken: process.env.METEOR_TOKEN
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

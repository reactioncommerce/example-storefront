import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

// Config
const { serverRuntimeConfig: { graphqlUrl } } = getConfig();

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState, options = {}) =>
  new ApolloClient({
    connectToDevTools: false,
    ssrMode: true,
    link: new HttpLink({
      uri: `${graphqlUrl}`,
      headers: {
        "meteor-login-token": `${options.meteorToken}`
      },
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });

/**
 * @name initApolloServer
 * @param {Object} initialState Initial state to initialize the Apollo client with
 * @param {Object} options Additional options to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */
export default function initApolloServer(initialState, options) {
  return create(initialState, options);
}

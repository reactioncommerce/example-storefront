import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

// Config
const { publicRuntimeConfig: { graphqlUrl } } = getConfig();
let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState, options = {}) =>
  new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link: new HttpLink({
      uri: `${graphqlUrl}`,
      headers: {
        "meteor-login-token": `${options.token}`
      },
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });


/**
 * @name initApolloBrowser
 * @param {Object} initialState Initial state to initialize the Apollo client with
 * @param {Object} options Additional options to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */
export default function initApolloBorwser(initialState, options) {
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

// Config
const { publicRuntimeConfig: { graphqlUrl, meteorToken } } = getConfig();

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState) =>
  new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link: new HttpLink({
      uri: `${graphqlUrl}`,
      headers: {
        "meteor-login-token": `${meteorToken}`
      },
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });

/**
 * @name initApolloBrowser
 * @param {*} initialState Initial state to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */
export default function initApolloBrowser(initialState) {
  return create(initialState);
}

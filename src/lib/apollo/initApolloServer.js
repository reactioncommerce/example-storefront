import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";

// Enviroment variables from config.client
const { env: { METEOR_TOKEN, GRAPHQL_URL } } = process;

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState) =>
  new ApolloClient({
    connectToDevTools: false,
    ssrMode: true,
    link: new HttpLink({
      uri: `${GRAPHQL_URL}`,
      headers: {
        "meteor-login-token": `${METEOR_TOKEN}`
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
export default function initApolloBorwser(initialState) {
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}

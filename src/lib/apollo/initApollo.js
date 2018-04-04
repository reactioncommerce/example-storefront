import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState) =>
  new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env
       .ENDPOINT}`,
      headers: {
        "meteor-login-token": `${process.env.METEOR_TOKEN}`
      },
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}

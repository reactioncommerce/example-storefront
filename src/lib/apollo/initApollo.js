import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

/**
 * Get auth tokens from local storage and include with the request
 * @name getAuthTokens
 * @param {Object} cookies The req.cookies object
 * @returns {Object} returns the parsed cookies as an object
 */
function getAuthTokens(cookies) {
  if (typeof localStorage !== "undefined") {
    return {
      keycloakToken: localStorage.getItem("keycloakToken"),
      meteorToken: localStorage.getItem("meteorToken")
    };
  }

  if (cookies) {
    const { keycloakToken, meteorToken } = cookies;
    return { keycloakToken, meteorToken };
  }

  return {};
}

// Config
let graphqlUrl;

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

/* eslint-disable prefer-destructuring */
if (process.browser) {
  graphqlUrl = publicRuntimeConfig.graphqlUrl;
} else {
  graphqlUrl = serverRuntimeConfig.graphqlUrl;
}
/* eslint-enable prefer-destructuring */


let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState, options) => {
  // error handling for Apollo Link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line no-console
        console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`);
      });
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.error(`[Network error]: ${networkError}`);
    }
  });

  // Set auth context
  // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context
  const authLink = setContext((__, { headers }) => {
    const { meteorToken, keycloakToken } = getAuthTokens(initialState && initialState.cookies);
    return {
      headers: {
        ...headers,
        "meteor-login-token": `${meteorToken || ""}`,
        // "Authorization": keycloakToken ? `Bearer ${keycloakToken}` : ""
        "Authorization": options.accessToken
      }
    };
  });

  const httpLink = new HttpLink({ uri: `${graphqlUrl}`, credentials: "same-origin" });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(errorLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState || {})
  });
};

/**
 * @name initApollo
 * @param {Object} initialState Initial state to initialize the Apollo client with
 * @param {Object} options Additional options to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */
export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

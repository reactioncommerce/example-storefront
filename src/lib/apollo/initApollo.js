import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import Cookies from "js-cookie";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import { omitTypenameLink } from "./omitVariableTypenameLink";
import { getUserSessionData, createNewSessionData } from "./sessionData";

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
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line no-console
        console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`);
      });
    }

    if (networkError) {
      const errorCode = networkError.response && networkError.response.status;

      // if a 401 error occurred, attempt to refresh the token, then make the API request again
      if (errorCode === 401) {
        const { refreshToken } = getUserSessionData();
        const { clientId, clientSecret, refreshTokenUrl } = publicRuntimeConfig.oauthClientConfig;
        if (process && process.browser) {
          const { headers } = operation.getContext();

          return new Observable(async (observer) => {
            try {
              const url = new URL(refreshTokenUrl);
              const params = { refreshToken, clientId, clientSecret };
              Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
              const res = await fetch(url);
              const json = await res.json();

              operation.setContext({
                headers: { ...headers, Authorization: json.access_token }
              });

              // Write new token into cookie
              const newSessionInfo = createNewSessionData(json);
              Cookies.set("storefront-session", newSessionInfo);

              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              };
              // retry the request after setting new token
              forward(operation).subscribe(subscriber);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error("Error from Refresh token API: ", error);
              observer.error(error);
            }
          });
        }
      }

      // eslint-disable-next-line no-console
      console.error(`[Network error]: ${networkError}`);
    }
  });

  let authorizationHeader = {};
  if (options.accessToken) {
    authorizationHeader = { Authorization: options.accessToken };
  }

  // Set auth context
  // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context
  const authLink = setContext((__, { headers }) => {
    if (process && process.browser) {
      const { accessToken } = getUserSessionData();
      if (accessToken) {
        authorizationHeader = { Authorization: accessToken };
      }
    }

    return {
      headers: {
        ...headers,
        ...authorizationHeader
      }
    };
  });

  const httpLink = new HttpLink({ uri: `${graphqlUrl}`, credentials: "same-origin" });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([omitTypenameLink, authLink, errorLink, httpLink]),
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

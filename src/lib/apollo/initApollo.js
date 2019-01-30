import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { Router } from "routes";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getOperationAST } from "graphql";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import logger from "../logger";
import { omitTypenameLink } from "./omitVariableTypenameLink";

const SIGN_IN_PATH = "/signin";
const STATUS_FOUND = 302;
const STATUS_UNAUTHORIZED = 401;

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

const wsGraphqlUrl = graphqlUrl.replace("http", "ws");

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
      const errorCode = networkError.response && networkError.response.status;
      if (errorCode === STATUS_UNAUTHORIZED) {
        // If a 401 Unauthorized error occurred, redirect to /signin.
        // This will re-authenticate the user without showing a login page and a new token is issued.
        logger.info("Attempting silent re-auth");
        if (process && process.browser) {
          Router.pushRoute(SIGN_IN_PATH);
        } else {
          // In server, if a 401 Unauthorized error occurred, redirect to /signin.
          // This will re-authenticate without showing a login page and a new token is issued.
          // Log out cookies so that the app will load unauthenticated if the re-auth doesn't work
          if (options.req) options.req.logout();
          if (options.res) {
            options.res.writeHead(STATUS_FOUND, { Location: SIGN_IN_PATH });
            options.res.end();
          }
        }

        return;
      }
      logger.error(`Unable to access the GraphQL API. Is it running and accessible at ${graphqlUrl} from the Storefront UI server?`);
    }
  });

  let authorizationHeader = {};
  if (options.accessToken) {
    authorizationHeader = { Authorization: options.accessToken };
  }

  // Set auth context
  // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context
  const authLink = setContext((__, { headers }) => ({
    headers: {
      ...headers,
      ...authorizationHeader
    }
  }));

  const httpLink = new HttpLink({ uri: graphqlUrl, credentials: "same-origin" });
  let link = httpLink;

  if (process.browser) {
    // If we are in the browser, try to split the request between wsLink and httpLink.
    const wsLink = new WebSocketLink({
      uri: wsGraphqlUrl,
      options: {
        reconnect: true, // auto-reconnect
        connectionParams: {
          authToken: options.accessToken
        }
      }
    });

    link = ApolloLink.split(
      (operation) => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        return !!operationAST && operationAST.operation === "subscription";
      },
      wsLink,
      httpLink
    );
  }

  return new ApolloClient({
    ssrMode: !process.browser,
    link: ApolloLink.from([omitTypenameLink, authLink, errorLink, link]),
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

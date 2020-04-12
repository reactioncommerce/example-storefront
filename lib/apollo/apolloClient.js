import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, fromPromise } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { onError } from "@apollo/link-error";
import fetch from "isomorphic-unfetch";
import logger from "../logger";
import { omitTypenameLink } from "./omitVariableTypenameLink";

const REFRESH_PATH = "/refresh";
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;

let token;

/**
 * @summary Set the access token that GraphQL requests will use in the Authorization header
 * @param {String} value New token value
 * @return {undefined}
 */
export function setAccessToken(value) {
  token = value;
}

const getNewToken = async () => {
  const result = await fetch(REFRESH_PATH, {
    method: "GET",
    credentials: "include"
  });
  const data = await result.json();

  return data;
};

let isRefreshing = false;
let pendingRequests = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

export default function createApolloClient() {
  // Config
  let graphqlUrl;

  /* eslint-disable prefer-destructuring */
  if (process.browser) {
    graphqlUrl = process.env.EXTERNAL_GRAPHQL_URL;
  } else {
    graphqlUrl = process.env.INTERNAL_GRAPHQL_URL;
  }

  const httpLink = new HttpLink({ uri: graphqlUrl, credentials: "same-origin", fetch });

  // error handling for Apollo Link
  const errorLink = onError((apolloError) => {
    const { graphQLErrors, networkError, operation, forward } = apolloError;

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        logger.error(`[GraphQL error]: ${message}`, {
          locations,
          operationName: operation && operation.operationName,
          path
        });
      });
    }

    if (networkError) {
      const errorCode = networkError.response && networkError.response.status;
      if (errorCode === STATUS_UNAUTHORIZED) {
        // If a 401 Unauthorized error occurred, silently refresh the token from /refresh.
        // This will re-authenticate the user without showing a login page and a new token is issued.

        let pendingRequestsQueue;
        if (!isRefreshing) {
          isRefreshing = true;
          pendingRequestsQueue = fromPromise(getNewToken()
            .then(({ accessToken }) => {
              setAccessToken(accessToken);
              resolvePendingRequests();
            })
            .catch((error) => {
              pendingRequests = [];
              setAccessToken();
            })
            .finally(() => {
              isRefreshing = false;
            }));
        } else {
          // We already have a pending refresh, therefore add the request to the queue
          // The request will be resolved after the token refresh finished and all previous requests resolved.
          pendingRequestsQueue = fromPromise(new Promise((resolve) => {
            pendingRequests.push(() => resolve());
          }));
        }

        return pendingRequestsQueue.flatMap(() => forward(operation));
      }
      if (errorCode !== STATUS_BAD_REQUEST) {
        logger.error(`Unable to access the GraphQL API. Is it running and accessible at ${graphqlUrl} from the Storefront UI server?`);
      }
    }
  });

  // Set auth context
  // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: token } : {})
    }
  }));

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([omitTypenameLink, errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
      }
    })
  });
}

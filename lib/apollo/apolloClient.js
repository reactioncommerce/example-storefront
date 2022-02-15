import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { onError } from "@apollo/link-error";
import fetch from "isomorphic-unfetch";
import { accountsLink } from "@accounts/apollo-link";
import getAccountsHandler from "../accountsServer";
import { omitTypenameLink } from "./omitVariableTypenameLink";

const STATUS_BAD_REQUEST = 400;

/**
* Instantiate the Apollo client
 * @returns {Object} a new Apollo Client instance
 */
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
    const { graphQLErrors, networkError, operation } = apolloError;

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line no-console
        console.error(`[GraphQL error]: ${message}`, {
          locations,
          operationName: operation && operation.operationName,
          path
        });
      });
    }

    if (networkError) {
      const errorCode = networkError.response && networkError.response.status;
      if (errorCode !== STATUS_BAD_REQUEST) {
        // eslint-disable-next-line no-console
        console.error(`Unable to access the GraphQL API. Is it running and accessible at ${graphqlUrl} from the Storefront UI server?`);
      } else {
        // eslint-disable-next-line no-console
        console.error(networkError);
      }
    }

    // Default
    return null;
  });

  const serverLink = setContext((_, { headers }) => headers);

  const { accountsClient } = getAccountsHandler();
  const authLink = accountsLink(() => accountsClient);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([omitTypenameLink, errorLink, typeof window === "undefined" ? serverLink : authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
      }
    })
  });
}

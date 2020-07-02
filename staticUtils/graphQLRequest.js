import { GraphQLClient } from "graphql-request";
import appConfig from "../config";

/**
 * Executes an arbitrary GraphQL query against the Reaction API
 *
 * @param {Object} query - The GraphQL query to execute
 * @param {Object} variables - The query's variables
 * @returns {Object} data - the resulting query data
 */
export default async function graphQLRequest(query, variables) {
  const endpoint = appConfig.IS_BUILDING_NEXTJS === true ? appConfig.BUILD_GRAPHQL_URL : appConfig.INTERNAL_GRAPHQL_URL;

  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      timeout: 20000
    });

    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("error-fetching-graphql", error);
    return null;
  }
}

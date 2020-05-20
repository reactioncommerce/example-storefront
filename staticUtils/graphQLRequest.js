import { GraphQLClient } from "graphql-request";
import appConfig from "../config";

export default async function graphQLRequest(query, variables) {
  const endpoint = appConfig.IS_BUILDING_NEXTJS === true ? appConfig.EXTERNAL_GRAPHQL_URL : appConfig.INTERNAL_GRAPHQL_URL;

  const graphQLClient = new GraphQLClient(endpoint, {
    timeout: 20000,
  });

  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error("error-fetching-graphql", error);
    return null;
  }
}

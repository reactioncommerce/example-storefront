import { GraphQLClient } from "graphql-request";

export default async function graphQLRequest(query, variables) {
  const endpoint = process.env.IS_BUILDING_NEXTJS === true ? process.env.EXTERNAL_GRAPHQL_URL : process.env.INTERNAL_GRAPHQL_URL;

  const graphQLClient = new GraphQLClient(endpoint, {
    timeout: 20000
  });

  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error("error-fetching-graphql", error);
    return null;
  }
}

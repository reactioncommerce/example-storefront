import primaryShopIdQuery from "containers/common-gql/primaryShopId.gql";
import tagsQuery from "containers/tags/tags.gql";

/**
 * @summary Gets all tags for the current shop from GraphQL and returns an array of them
 * @param {Object} client ApolloClient instance
 * @param {Object} variables The query variables for this page
 * @returns {Object[]} Array of all tags on this and all future pages (calls itself recursively)
 */
async function getTags(client, variables) {
  const { data } = await client.query({ query: tagsQuery, variables });
  const { edges, pageInfo } = data.tags;

  const tagList = edges.map((edge) => edge.node);

  if (pageInfo.hasNextPage) {
    const remainingTags = await getTags(client, { ...variables, cursor: pageInfo.endCursor });
    return [...tagList, ...remainingTags];
  }

  return tagList;
}

/**
 * @summary Gets all tags for the current shop from GraphQL and returns an array of them
 * @param {Object} client ApolloClient instance
 * @returns {Object[]} Array of all tags
 */
export default async function getAllTags(client) {
  const { data: { primaryShopId } } = await client.query({ query: primaryShopIdQuery });

  if (!primaryShopId) {
    throw new Error("primaryShopId query result was null");
  }

  return getTags(client, { shopId: primaryShopId });
}

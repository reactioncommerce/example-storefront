import { request } from "graphql-request";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import tagsQuery from "./tags.js";

const endpoint = process.env.NODE_ENV === "production" ? process.env.EXTERNAL_GRAPHQL_URL : process.env.INTERNAL_GRAPHQL_URL;

/**
 * @summary Gets all tags for the current shop from GraphQL and returns an array of them
 * @param {Object} variables The query variables for this page
 * @returns {Object[]} Array of all tags on this and all future pages (calls itself recursively)
 */
async function getTags(variables) {
  const data = await request(endpoint, tagsQuery, variables);

  const { edges, pageInfo } = data.tags;

  const tagList = edges.map((edge) => edge.node);

  if (pageInfo.hasNextPage) {
    const remainingTags = await getTags({ ...variables, cursor: pageInfo.endCursor });
    return [...tagList, ...remainingTags];
  }

  return tagList;
}

/**
 * @summary Gets all tags for the current shop from GraphQL and returns an array of them
 * @param {Object} client ApolloClient instance
 * @returns {Object[]} Array of all tags
 */
export default async function fetchAllTags() {
  const { shop } = await fetchPrimaryShop();

  if (!shop) {
    console.warn("primaryShop query result was null");
    return [];
  }

  const allTags = await getTags({ shopId: shop._id });

  return allTags && { tags: allTags };
}

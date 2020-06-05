import graphQLRequest from "staticUtils/graphQLRequest";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import tagsQuery from "./tags.js";

/**
 * @summary Gets all tags for the current shop from GraphQL and returns an array of them
 * @param {Object} variables The query variables for this page
 * @returns {Object[]} Array of all tags on this and all future pages (calls itself recursively)
 */
async function getTags(variables) {
  const data = await graphQLRequest(tagsQuery, variables);

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
 * @param {String} lang - the shop's language
 * @returns {Object[]} Array of all tags
 */
export default async function fetchAllTags(lang) {
  const { shop } = await fetchPrimaryShop(lang);

  if (!shop) {
    // eslint-disable-next-line no-console
    console.warn("primaryShop query result was null");
    return [];
  }

  const allTags = await getTags({ shopId: shop._id });

  return allTags && { tags: allTags };
}

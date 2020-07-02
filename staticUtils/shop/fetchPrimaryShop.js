import graphQLRequest from "staticUtils/graphQLRequest";
import primaryShopQuery from "./primaryShop.js";

/**
 * Fetch the primary shop's information
 *
 * @param {String} language - The shop's language
 * @returns {Object} The primary shop
 */
export default async function fetchPrimaryShop(language) {
  const data = await graphQLRequest(primaryShopQuery, { language });

  return (data && data.primaryShop && { shop: data.primaryShop }) || { shop: null };
}

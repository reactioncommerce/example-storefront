import client from "../../lib/apollo/apolloClient";
import primaryShopQuery from "./primaryShop.gql";

/**
 * Fetch the primary shop's information
 *
 * @param {String} language - The shop's language
 * @returns {Object} The primary shop
 */
export default async function fetchPrimaryShop(language) {
  const { data } = await client.query({
    query: primaryShopQuery,
    variables: {
      language
    }
  });

  return data?.primaryShop ? { shop: data.primaryShop } : { shop: null };
}

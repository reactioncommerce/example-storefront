import graphQLRequest from "staticUtils/graphQLRequest";
import catalogItemProductQuery from "./catalogItemProduct.js";

/**
 * Fetch a product by its slug or id
 *
 * @param {String} slugOrId - The slug or id of the product to fetch
 * @returns {Object} product - the fetched product
 */
export default async function fetchCatalogProduct(slugOrId) {
  if (!slugOrId) return { product: {} };

  const data = await graphQLRequest(catalogItemProductQuery, {
    slugOrId
  });

  return data && data.catalogItemProduct && { product: data.catalogItemProduct.product };
}

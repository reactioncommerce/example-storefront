import graphQLRequest from "staticUtils/graphQLRequest";
import catalogItemProductQuery from "./catalogItemProduct.js";

export default async function fetchCatalogProduct(slugOrId) {
  if (!slugOrId) return { product: {} };

  const data = await graphQLRequest(catalogItemProductQuery, {
    slugOrId
  });

  return data && data.catalogItemProduct && { product: data.catalogItemProduct.product };
}

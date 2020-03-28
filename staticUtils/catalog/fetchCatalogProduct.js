import { request } from "graphql-request";
import catalogItemProductQuery from "./catalogItemProduct.js";

export default async function fetchCatalogProduct(slugOrId) {
  if (!slugOrId) return { product: {} };

  const endpoint = process.env.NODE_ENV === "production" ? process.env.EXTERNAL_GRAPHQL_URL : process.env.INTERNAL_GRAPHQL_URL;

  const data = await request(endpoint, catalogItemProductQuery, {
    slugOrId
  });

  return data && data.catalogItemProduct && { product: data.catalogItemProduct.product };
}

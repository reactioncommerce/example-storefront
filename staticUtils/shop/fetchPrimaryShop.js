import { request } from "graphql-request";
import primaryShopQuery from "./primaryShop.js";

export default async function fetchPrimaryShop(language) {
  const endpoint = process.env.NODE_ENV === "production" ? process.env.EXTERNAL_GRAPHQL_URL : process.env.INTERNAL_GRAPHQL_URL;

  const data = await request(endpoint, primaryShopQuery, { language });

  return data && data.primaryShop && { shop: data.primaryShop };
}

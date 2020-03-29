import graphQLRequest from "staticUtils/graphQLRequest";
import primaryShopQuery from "./primaryShop.js";

export default async function fetchPrimaryShop(language) {
  const data = await graphQLRequest(primaryShopQuery, { language });

  return data && data.primaryShop && { shop: data.primaryShop };
}

import graphQLRequest from "staticUtils/graphQLRequest";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import tagQuery from "./tag.js";

export default async function fetchTag(slugOrId, lang) {
    const { shop } = await fetchPrimaryShop(lang);
    const data = await graphQLRequest(tagQuery, { shopId: shop && shop._id, slugOrId });

    return data && data.tag && { tag: data.tag };
}
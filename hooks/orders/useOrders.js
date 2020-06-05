import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import { pagination, paginationVariablesFromUrlParams } from "lib/utils/pagination";
import { ordersByAccountIdQuery } from "./queries.gql";

/**
 * Get the user's orders context
 *
 * @returns {Object} the user's orders context
 */
export default function useOrders() {
  const { authStore, uiStore } = useStores();
  const shop = useShop();
  const { query } = useRouter();
  const { accountId } = authStore;

  const { loading, data, fetchMore } = useQuery(ordersByAccountIdQuery, {
    skip: !shop || !shop._id || !accountId,
    variables: {
      accountId,
      language: uiStore.language,
      orderStatus: uiStore.orderStatusQuery,
      shopIds: shop && [shop._id],
      ...paginationVariablesFromUrlParams(query, { defaultPageLimit: uiStore.orderQueryLimit })
    }
  });

  const orders = data && data.orders;

  return [
    orders,
    loading,
    pagination({
      fetchMore,
      data,
      queryName: "orders",
      limit: uiStore.orderQueryLimit
    })
  ];
}

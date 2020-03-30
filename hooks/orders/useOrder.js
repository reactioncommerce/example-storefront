import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useViewer from "hooks/viewer/useViewer";
import { orderByReferenceId } from "./queries.gql";

export default function useOrder() {
  const { uiStore } = useStores();
  const shop = useShop();
  const [viewer] = useViewer();
  const { query } = useRouter();

  const { loading, data } = useQuery(orderByReferenceId, {
    skip: !shop || !shop._id || !query.orderId || (!query.token && (!viewer || !viewer._id)),
    variables: {
      id: query.orderId,
      language: uiStore.language,
      shopId: shop && shop._id,
      token: query.token || null
    }
  });

  const order = data && data.order;

  return [
    order,
    loading
  ];
}

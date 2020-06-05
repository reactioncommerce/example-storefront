import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useShop from "hooks/shop/useShop";
import useViewer from "hooks/viewer/useViewer";
import availablePaymentMethodsQuery from "./availablePaymentMethods.gql";


/**
 * Gets the available payment methods
 *
 * @returns {Array} A list of available payment methods
 */
export default function useAvailablePaymentMethods() {
  const shop = useShop();
  const [viewer, isLoadingViewer] = useViewer();

  const { loading, data, refetch } = useQuery(availablePaymentMethodsQuery, {
    skip: !shop || isLoadingViewer,
    variables: {
      shopId: shop && shop._id
    }
  });

  useEffect(() => {
    refetch();
  }, [viewer]);

  const availablePaymentMethods = data && data.availablePaymentMethods && data.availablePaymentMethods.filter((method) => method.isEnabled);

  return [
    availablePaymentMethods,
    loading
  ];
}

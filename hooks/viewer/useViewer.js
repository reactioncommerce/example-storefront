import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
import viewerQuery from "./viewer.gql";

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useViewer() {
  const { authStore } = useStores();
  const { account, setAccount, accessToken } = authStore;

  const { loading, data, refetch } = useQuery(viewerQuery, {
    skip: !accessToken
  });

  const viewer = data && data.viewer;

  useEffect(() => {
    if (!viewer && accessToken) {
      refetch();
    }
  }, [accessToken, viewer]);

  useEffect(() => {
    if (viewer) setAccount(viewer);
  }, [viewer]);

  return [
    account,
    loading,
    refetch
  ];
}

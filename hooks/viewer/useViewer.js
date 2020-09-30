import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
import { useAnalytics } from "use-analytics";
import { decodeOpaqueId } from "lib/utils/decoding";
import viewerQuery from "./viewer.gql";

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useViewer() {
  const { authStore } = useStores();
  const { identify } = useAnalytics();
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
    if (viewer) {
      setAccount(viewer);

      // identify the user
      const isAuthenticated = viewer?._id;
      const isTracked = localStorage.getItem("isTracked");

      // if we already use identify to get identity of the user we don't need to send it again
      if (!!isAuthenticated && isTracked === "false") {
        const accountDecoded = decodeOpaqueId(viewer._id);
        localStorage.setItem("isTracked", true);

        identify(accountDecoded.id, {
          firstName: viewer?.firstName,
          lastName: viewer?.lastName,
          email: viewer.primaryEmailAddress
        });
      }
    } else {
      localStorage.setItem("isTracked", false);
    }
  }, [viewer]);

  return [
    account,
    loading,
    refetch
  ];
}

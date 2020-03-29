import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { updateAccountAddressBookEntryMutation } from "./mutations.gql";

export default function useUpdateAccountAddressBookEntry() {
  const [viewer, isLoadingViewer, refetchViewer] = useViewer();

  const [updateAccountAddressBookEntryFunc, { loading }] = useMutation(updateAccountAddressBookEntryMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const updateAccountAddressBookEntry = async (addressId, updates) => {
    const data = await updateAccountAddressBookEntryFunc({
      variables: {
        input: {
          addressId,
          accountId: viewer && viewer._id,
          updates
        }
      }
    });

    return data;
  };

  return [
    updateAccountAddressBookEntry,
    loading
  ];
}
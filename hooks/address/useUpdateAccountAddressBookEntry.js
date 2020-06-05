import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { updateAccountAddressBookEntryMutation } from "./mutations.gql";

/**
 * Updates a users address book entries
 *
 * @returns {Array} A list of updated address book entries
 */
export default function useUpdateAccountAddressBookEntry() {
  const [viewer, refetchViewer] = useViewer();

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

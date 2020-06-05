import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { removeAccountAddressBookEntryMutation } from "./mutations.gql";

/**
 * Removes a address book entry
 *
 * @returns {Array} A list of removed address book entries
 */
export default function useRemoveAccountAddressBookEntry() {
  const [viewer, refetchViewer] = useViewer();

  const [removeAccountAddressBookEntryFunc, { loading }] = useMutation(removeAccountAddressBookEntryMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const removeAccountAddressBookEntry = async (addressId) => {
    const data = await removeAccountAddressBookEntryFunc({
      variables: {
        input: {
          addressId,
          accountId: viewer && viewer._id
        }
      }
    });

    return data;
  };

  return [
    removeAccountAddressBookEntry,
    loading
  ];
}

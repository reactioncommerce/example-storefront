import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { addAccountAddressBookEntryMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddAccountAddressBookEntry() {
  const [viewer, refetchViewer] = useViewer();

  const [addAccountAddressBookEntryFunc, { loading }] = useMutation(addAccountAddressBookEntryMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const addAccountAddressBookEntry = async (address) => {
    // TEMP delete `addressName` prop until API supports it.
    delete address.addressName;

    const data = await addAccountAddressBookEntryFunc({
      variables: {
        input: {
          address,
          accountId: viewer && viewer._id
        }
      }
    });

    return data;
  };

  return [
    addAccountAddressBookEntry,
    loading
  ];
}

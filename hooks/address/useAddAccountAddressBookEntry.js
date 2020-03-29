import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { addAccountAddressBookEntryMutation } from "./mutations.gql";

export default function useAddAccountAddressBookEntry() {
  const [viewer, isLoadingViewer, refetchViewer] = useViewer();

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

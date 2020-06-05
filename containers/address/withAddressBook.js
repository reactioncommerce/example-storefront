import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import useAddAccountAddressBookEntry from "hooks/address/useAddAccountAddressBookEntry";
import useRemoveAccountAddressBookEntry from "hooks/address/useRemoveAccountAddressBookEntry";
import useUpdateAccountAddressBookEntry from "hooks/address/useUpdateAccountAddressBookEntry";

/**
 * @summary HOC that adds address book props
 * @param {React.Component} Component React Component to wrap
 * @return {React.Component} Wrapped component
 */
export default function withAddressBook(Component) {
  function WithAddressBook(props) { // eslint-disable-line require-jsdoc
    const [addAccountAddressBookEntry] = useAddAccountAddressBookEntry();
    const [updateAccountAddressBookEntry] = useUpdateAccountAddressBookEntry();
    const [removeAccountAddressBookEntry] = useRemoveAccountAddressBookEntry();

    return (
      <Component
        {...props}
        onAddressAdded={addAccountAddressBookEntry}
        onAddressEdited={updateAccountAddressBookEntry}
        onAddressDeleted={removeAccountAddressBookEntry}
      />
    );
  }

  hoistNonReactStatic(WithAddressBook, Component);

  return WithAddressBook;
}

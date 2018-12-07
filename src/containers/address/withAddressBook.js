import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatic from "hoist-non-react-statics";
import { withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import { addAccountAddressBookEntry, removeAccountAddressBookEntry } from "./mutations.gql";
import viewerQuery from "../account/viewer.gql";

export default function withAddressBook(Comp) {
  @withApollo
  @inject("authStore")
  @observer
  class WithAddressBook extends Component {
    static propTypes = {
      authStore: PropTypes.shape({
        account: PropTypes.object.isRequired
      }),
      client: PropTypes.shape({
        query: PropTypes.func.isRequired
      })
    };

    state = {};

    /**
     *
     * @method
     * @summary
     * @param
     * @since
     * @return
     */
    get accountId() {
      const { authStore } = this.props;
      return authStore && authStore.account && authStore.account._id;
    }

    get accountAddressBook() {
      const { authStore } = this.props;
      return (
        authStore &&
        authStore.account &&
        authStore.account.addressBook &&
        relayConnectionToArray(authStore.account.addressBook)
      );
    }

    /**
     *
     * @method
     * @summary
     * @param
     * @since
     * @return
     */
    handleAddAccountAddressBookEntry = (address) => {
      const { client: apolloClient } = this.props;

      // TEMP delete `addressName` prop until API supports it.
      delete address.addressName;
      console.log("adding a new addres?", address);

      apolloClient.mutate({
        mutation: addAccountAddressBookEntry,
        variables: {
          input: {
            address,
            accountId: this.accountId
          }
        },
        update: (cache, { data: mutationData }) => {
          if (mutationData && mutationData.addAccountAddressBookEntry) {
            const { address: newAddressEntry } = mutationData.addAccountAddressBookEntry;
            const stuff = cache.readQuery(viewerQuery);
            console.log("whats in the mutation cache?", stuff);
            if (newAddressEntry) {
              // Update Apollo cache
              cache.writeQuery({
                query: viewerQuery,
                data: { account: { addressBook: [newAddressEntry] } }
              });
            }
          }
        }
      });
    };

    /**
     *
     * @method
     * @summary
     * @param
     * @since
     * @return
     */
    handleRemoveAccountAddressBookEntry = (addressId) => {
      const { client: apolloClient } = this.props;

      console.log("delete address", addressId);

      apolloClient.mutate({
        mutation: removeAccountAddressBookEntry,
        variables: {
          input: {
            addressId,
            accountId: this.accountId
          }
        },
        update: (cache, { data: mutationData }) => {
          if (mutationData && mutationData.removeAccountAddressBookEntry) {
            const { address: removedAddressEntry } = mutationData.removeAccountAddressBookEntry;
            console.log("whats in the mutation cache?", removedAddressEntry, this.accountAddressBook);
            if (removedAddressEntry) {
              // Update Apollo cache
              cache.writeQuery({
                query: viewerQuery,
                data: { account: { addressBook: [removedAddressEntry] } }
              });
            }
          }
        }
      });
    };

    render() {
      return (
        <Fragment>
          <Comp
            {...this.props}
            onAddressAdded={this.handleAddAccountAddressBookEntry}
            onAddressDeleted={this.handleRemoveAccountAddressBookEntry}
          />
        </Fragment>
      );
    }
  }

  hoistNonReactStatic(WithAddressBook, Comp);

  return WithAddressBook;
}

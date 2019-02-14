import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatic from "hoist-non-react-statics";
import { withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import viewerQuery from "../account/viewer.gql";
import {
  addAccountAddressBookEntry,
  updateAccountAddressBookEntry,
  removeAccountAddressBookEntry
} from "./mutations.gql";

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

    get accountId() {
      const { authStore } = this.props;
      return authStore && authStore.account && authStore.account._id;
    }

    get accountAddressBook() {
      const { authStore: { account: { addressBook } } } = this.props;
      return (addressBook && relayConnectionToArray(addressBook)) || [];
    }

    /**
     * @name handleAddAccountAddressBookEntry
     * @summary Adds an address to current user's address book
     * @param {Object} address Address to add
     * @return {Undefined} undefined
     */
    handleAddAccountAddressBookEntry = (address) => {
      const { client: apolloClient } = this.props;

      // TEMP delete `addressName` prop until API supports it.
      delete address.addressName;

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
            if (newAddressEntry) {
              const cacheData = cache.readQuery({ query: viewerQuery });
              if (!cacheData.viewer.addressBook) {
                cacheData.viewer.addressBook = { edges: [] };
              }
              cacheData.viewer.addressBook.edges.push({
                __typename: "AddressEdge",
                node: newAddressEntry
              });
              // Update Apollo cache
              cache.writeQuery({
                query: viewerQuery,
                data: cacheData
              });
            }
          }
        }
      });
    };

    /**
     * @name handleEditAccountAddressBookEntry
     * @summary Updates an address in current user's address book
     * @param {String} addressId _id of address to update
     * @param {Object} updates Field updates
     * @return {Undefined} undefined
     */
    handleEditAccountAddressBookEntry = (addressId, updates) => {
      const { client: apolloClient } = this.props;
      apolloClient.mutate({
        mutation: updateAccountAddressBookEntry,
        variables: {
          input: {
            addressId,
            accountId: this.accountId,
            updates
          }
        }
      });
    };

    /**
     * @name handleRemoveAccountAddressBookEntry
     * @summary Asks user to confirm, then deletes address from current user's address book
     * @param {String} addressId _id of address to delete
     * @return {Undefined} undefined
     */
    handleRemoveAccountAddressBookEntry = (addressId) => {
      const { client: apolloClient } = this.props;

      if (!confirm("Delete this address?")) {
        return;
      }

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
            if (removedAddressEntry) {
              const cacheData = cache.readQuery({ query: viewerQuery });
              const removedIndex = cacheData.viewer.addressBook.edges.findIndex((edge) => edge.node._id === addressId);
              cacheData.viewer.addressBook.edges.splice(removedIndex, 1);
              // Update Apollo cache
              cache.writeQuery({
                query: viewerQuery,
                data: cacheData
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
            onAddressEdited={this.handleEditAccountAddressBookEntry}
            onAddressDeleted={this.handleRemoveAccountAddressBookEntry}
          />
        </Fragment>
      );
    }
  }

  hoistNonReactStatic(WithAddressBook, Comp);

  return WithAddressBook;
}

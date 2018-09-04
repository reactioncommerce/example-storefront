import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import cartItemsConnectionToArray from "lib/utils/cartItemsConnectionToArray";
import {
  createCartMutation,
  addCartItemsMutation,
  removeCartItemsMutation,
  reconcileCartsMutation,
  setEmailOnAnonymousCartMutation,
  setFulfillmentOptionCartMutation,
  setShippingAddressCartMutation,
  updateCartItemsQuantityMutation
} from "./mutations.gql";
import {
  accountCartByAccountIdQuery,
  anonymousCartByCartIdQuery
} from "./queries.gql";

/**
 * withCart higher order query component for creating, fetching, and updating carts
 * @name WithCart
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default (Component) => (
  @withApollo
  @inject("cartStore", "authStore")
  @observer
  class WithCart extends React.Component {
    static propTypes = {
      authStore: PropTypes.shape({
        accountId: PropTypes.string,
        token: PropTypes.string,
        isAuthenticated: PropTypes.bool
      }),
      cartStore: PropTypes.shape({
        anonymousCartId: PropTypes.string,
        anonymousCartToken: PropTypes.string,
        setAnonymousCartCredentialsFromLocalStorage: PropTypes.func
      }),
      client: PropTypes.shape({
        mutate: PropTypes.func.isRequired
      }),
      shop: PropTypes.shape({
        _id: PropTypes.string
      })
    }

    componentDidMount() {
      const { cartStore } = this.props;

      // Update the anonymousCartId if necessary
      cartStore.setAnonymousCartCredentialsFromLocalStorage();
    }

    /**
     * Reconcile an anonymous and account cart when an anonymous user signs in
     * and they have an anonymous cart.
     * @name reconcileCartsIfNecessary
     * @summary Called when a user signs in with an anonymous cart
     * @private
     * @ignore
     * @param {Function} refetchCart An Apollo query function to refetch cart data
     * @returns {undefined} No return
     */
    reconcileCartsIfNecessary(refetchCart) {
      const { authStore, cartStore, shop, client: apolloClient } = this.props;

      if (cartStore.hasAnonymousCartCredentials && authStore.isAuthenticated && cartStore.isReconcilingCarts === false) {
        // Prevent multiple calls to reconcile cart mutations when one is currently in progress
        cartStore.setIsReconcilingCarts(true);

        apolloClient.mutate({
          mutation: reconcileCartsMutation,
          update: (cache, { data: mutationData }) => {
            // If the mutation data contains a createCart object and we are an anonymous user,
            // then set the anonymous cart details
            if (mutationData && mutationData.reconcileCarts) {
              const { cart: cartPayload } = mutationData.reconcileCarts;

              if (cartPayload) {
                // Clear anonymous account credentials
                cartStore.clearAnonymousCartCredentials();

                // Update cache for account cart query
                cache.writeQuery({
                  query: accountCartByAccountIdQuery,
                  data: { cart: cartPayload }
                });

                // Refetch cart
                refetchCart && refetchCart();
              }
            }

            cartStore.setIsReconcilingCarts(false);
          },
          variables: {
            input: {
              anonymousCartId: cartStore.anonymousCartId,
              anonymousCartToken: cartStore.anonymousCartToken,
              shopId: shop._id
            }
          }
        });
      }
    }

    /**
     * @name handleAddItemsToCart
     * @summary Called when addItemsToCart callback is called
     * @private
     * @ignore
     * @param {Function} mutation An Apollo mutation function
     * @param {Object} data An an object containing input data for mutations
     * @param {Array} data.items An an array of CartItemInput objects
     * @returns {undefined} No return
     */
    handleAddItemsToCart(mutation, data) {
      const { authStore, cartStore, shop } = this.props;
      const input = {
        items: data.items
      };

      if (authStore.isAuthenticated === false && cartStore.hasAnonymousCartCredentials) {
        // Given an anonymous user, with a cart, add token and cartId to input
        const { anonymousCartId, anonymousCartToken } = cartStore;

        // Add items to an existing anonymous cart
        input.token = anonymousCartToken;
        input.cartId = anonymousCartId;
      } else if (authStore.isAuthenticated === true && cartStore.hasAccountCart) {
        // With an account and an account cart, set the accountCartId on the input object
        input.cartId = cartStore.accountCartId;
      } else if (!cartStore.hasAccountCart && !cartStore.hasAnonymousCartCredentials) {
        // With no anonymous or account cart, add shop Id to input as it will be needed for the create cart mutation
        input.shopId = shop._id;
      }

      // Run the mutation function provided as a param.
      // It may take the form of `createCart` or `addCartItems` depending on the
      // availability of a cart for either an anonymous or logged-in account.
      mutation({
        variables: {
          input
        }
      });
    }

    /**
     * @name handleChangeCartItemsQuantity
     * @summary Update the quantity of one or more cart items
     * @ignore
     * @param {Array<Object>|Object} cartItems An array of objects or a single object of shape: { cartItemId: String, quantity: Int }
     * @returns {undefined} No return
     */
    handleChangeCartItemsQuantity = (cartItems) => {
      const { cartStore, client: apolloClient } = this.props;

      apolloClient.mutate({
        mutation: updateCartItemsQuantityMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId || cartStore.accountCartId,
            items: (Array.isArray(cartItems) && cartItems) || [cartItems],
            token: cartStore.anonymousCartToken || null
          }
        },
        update: (cache, { data: mutationData }) => {
          if (mutationData && mutationData.updateCartItemsQuantity) {
            const { cart: cartPayload } = mutationData.updateCartItemsQuantity;

            if (cartPayload) {
              // Update Apollo cache
              cache.writeQuery({
                query: cartPayload.account ? accountCartByAccountIdQuery : anonymousCartByCartIdQuery,
                data: { cart: cartPayload }
              });
            }
          }
        }
      });
    }

    /**
     * @name handleRemoveCartItems
     * @summary Remove items from the cart by id
     * @private
     * @ignore
     * @param {Array|String} itemIds Ids of the products to remove from the cart
     * @returns {undefined} No return
     */
    handleRemoveCartItems = (itemIds) => {
      const { cartStore, client: apolloClient } = this.props;

      apolloClient.mutate({
        mutation: removeCartItemsMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId || cartStore.accountCartId,
            cartItemIds: (Array.isArray(itemIds) && itemIds) || [itemIds],
            token: cartStore.anonymousCartToken || null
          }
        },
        update: (cache, { data: mutationData }) => {
          if (mutationData && mutationData.removeCartItems) {
            const { cart: cartPayload } = mutationData.removeCartItems;

            if (cartPayload) {
              // Update Apollo cache
              cache.writeQuery({
                query: cartPayload.account ? accountCartByAccountIdQuery : anonymousCartByCartIdQuery,
                data: { cart: cartPayload }
              });
            }
          }
        }
      });
    }

    /**
     * @name handleSetEmailOnAnonymousCart
     * @summary Call when `setEmailOnAnonymousCart` callback is called
     * @param {Function} mutation An Apollo mutation function
     * @param {string} email An email address to be set on an anonymous cart
     * @return {undefined} No return
     */
    handleSetEmailOnAnonymousCart = ({ email }) => {
      const { cartStore, client: apolloClient } = this.props;
      apolloClient.mutate({
        mutation: setEmailOnAnonymousCartMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId,
            email,
            token: cartStore.anonymousCartToken
          }
        }
      });
    }

    /**
     * @name handleSetFulfillmentOption
     * @summary Sets a fulfillment method for items in a cart
     * @param {Object} fulfillmentOption - an object with the following props:
     * cartId, cartToken, fulfillmentGroupId, fulfillmentMethodId
     * @param {Function} mutation An Apollo mutation function
     * @return {undefined} No return
     */
    handleSetFulfillmentOption = ({ fulfillmentGroupId, fulfillmentMethodId }) => {
      const { cartStore, client: apolloClient } = this.props;

      apolloClient.mutate({
        mutation: setFulfillmentOptionCartMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId,
            cartToken: cartStore.anonymousCartToken,
            fulfillmentGroupId,
            fulfillmentMethodId
          }
        }
      });
    }

    /**
     * @name handleSetShippingAddress
     * @summary Sets the shipping address for the cart
     * @param {Object} address - an object with the following props:
     *  address, addressId(optional), cartId, cartToken
     * @param {Function} mutation An Apollo mutation function
     * @return {undefined} No return
     */
    handleSetShippingAddress = (address) => {
      const { cartStore, client: apolloClient } = this.props;

      return apolloClient.mutate({
        mutation: setShippingAddressCartMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId,
            cartToken: cartStore.anonymousCartToken,
            address
          }
        }
      });
    }

    render() {
      const { authStore, cartStore, shop } = this.props;
      let query = anonymousCartByCartIdQuery;
      let variables;
      let skipQuery = false;

      // With an anonymous cart
      if (cartStore.hasAnonymousCartCredentials) {
        // Otherwise, set query and variables for fetching an anonymous cart
        query = anonymousCartByCartIdQuery;
        variables = {
          cartId: cartStore.anonymousCartId,
          token: cartStore.anonymousCartToken
        };
      } else if (authStore.isAuthenticated) {
        // With an authenticated user, update the cart query to find an authenticated cart
        query = accountCartByAccountIdQuery;
        variables = {
          accountId: authStore.accountId,
          shopId: shop._id
        };
      } else {
        // Otherwise skip the query since we have nothing to load
        skipQuery = true;
      }

      return (
        <Query query={query} variables={variables} skip={skipQuery}>
          {({ data: cartData, fetchMore, refetch: refetchCart }) => {
            const { cart } = cartData || {};
            const { pageInfo } = (cart && cart.items) || {};

            // With an authenticated cart, set the accountCartId for later use
            if (cart && cart.account && cart.account._id === authStore.accountId && authStore.isAuthenticated) {
              cartStore.setAccountCartId(cart._id);
            } else {
              cartStore.setAccountCartId(null);
            }

            // If we are authenticated, reconcile carts
            if (cartStore.hasAnonymousCartCredentials && authStore.isAuthenticated) {
              this.reconcileCartsIfNecessary(refetchCart);
            }

            let processedCartData = null;
            if (cart) {
              processedCartData = {
                ...cart,
                items: cartItemsConnectionToArray(cart.items)
              };
            }

            return (
              <Mutation
                mutation={cart ? addCartItemsMutation : createCartMutation}
                update={(cache, { data: mutationData }) => {
                  // On update, refetch cart data
                  refetchCart();

                  // If the mutation data contains a createCart object and we are an anonymous user,
                  // then set the anonymous cart details
                  if (mutationData && mutationData.createCart && !authStore.isAuthenticated) {
                    const { cart: cartPayload, token } = mutationData.createCart;
                    cartStore.setAnonymousCartCredentials(cartPayload._id, token);
                  }
                }}
              >
                {(mutationFunction) => (
                  <Component
                    {...this.props}
                    hasMoreCartItems={(pageInfo && pageInfo.hasNextPage) || false}
                    onChangeCartItemsQuantity={this.handleChangeCartItemsQuantity}
                    onRemoveCartItems={this.handleRemoveCartItems}
                    loadMoreCartItems={() => {
                      fetchMore({
                        variables: {
                          itemsAfterCursor: (pageInfo && pageInfo.endCursor) || null
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {
                          const { cart: fetchMoreCart } = fetchMoreResult;

                          // Check for additional items from result
                          if (fetchMoreCart && fetchMoreCart.items && Array.isArray(fetchMoreCart.items.edges) && fetchMoreCart.items.edges.length) {
                            // Merge previous cart items with next cart items
                            return {
                              ...fetchMoreResult,
                              cart: {
                                ...fetchMoreCart,
                                items: {
                                  __typename: previousResult.cart.items.__typename,
                                  pageInfo: fetchMoreCart.items.pageInfo,
                                  edges: [
                                    ...previousResult.cart.items.edges,
                                    ...fetchMoreCart.items.edges
                                  ]
                                }
                              }
                            };
                          }

                          // Send the previous result if the new result contains no additional data
                          return previousResult;
                        }
                      });
                    }}
                    addItemsToCart={(items) => {
                      this.handleAddItemsToCart(mutationFunction, {
                        items
                      });
                    }}
                    setEmailOnAnonymousCart={this.handleSetEmailOnAnonymousCart}
                    checkout={{
                      onSetFulfillmentOption: this.handleSetFulfillmentOption,
                      onSetShippingAddress: this.handleSetShippingAddress
                    }}
                    cart={processedCartData}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>

      );
    }
  }
);

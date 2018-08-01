import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import accountCartQuery from "./accountCart.gql";
import anonymousCartQuery from "./anonymousCart.gql";
import createCartMutation from "./createCartMutation.gql";
import addCartItemsMutation from "./addCartItemsMutation.gql";
import reconcileCartsMutation from "./reconcileCartsMutation.gql";

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
      this.isReconcilingCarts = false;
    }

    /**
     * Reconcile an anonymous and account cart when an anonymous user signs in
     * and they have an anonymous cart.
     * @name reconcileCartsIfNecessary
     * @summary Called when a user signs in with an anonymous cart
     * @private
     * @ignore
     * @returns {undefined} No return
     */
    reconcileCartsIfNecessary() {
      const { authStore, cartStore, shop, client: apolloClient } = this.props;

      if (cartStore.hasAnonymousCartCredentials && authStore.isAuthenticated && this.isReconcilingCarts === false) {
        // Prevent multiple calls to reconcile cart mutations when one is currently in progress
        this.isReconcilingCarts = true;

        apolloClient.mutate({
          mutation: reconcileCartsMutation,
          update: (cache, { data: mutationData }) => {
            // If the mutation data contains a createCart object and we are an anonymous user,
            // then set the anonymous cart details
            if (mutationData && mutationData.reconcileCarts) {
              const { cart: cartPayload } = mutationData.reconcileCarts;

              if (cartPayload) {
                cartStore.clearAnonymousCartCredentials();
              }
            }

            this.isReconcilingCarts = false;
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

    render() {
      const { authStore, cartStore, shop } = this.props;
      let query = anonymousCartQuery;
      let variables;
      let skipQuery = false;

      // With an anonymous cart
      if (cartStore.hasAnonymousCartCredentials) {
        // If we are authenticated, reconcile carts
        if (authStore.isAuthenticated) {
          this.reconcileCartsIfNecessary();

          // Render the component during cart reconciliation
          // But set props to null to indicate that no actions may take place to
          // get or mutate the cart until the reconciliation is complete
          return (
            <Component
              {...this.props}
              isReconcilingCarts={true}
              hasMoreCartItems={false}
              loadMoreCartItems={null}
              addItemsToCart={null}
              cart={null}
            />
          );
        }

        // Otherwise, set query and variables for fetching an anonymous cart
        query = anonymousCartQuery;
        variables = {
          cartId: cartStore.anonymousCartId,
          token: cartStore.anonymousCartToken
        };
      } else if (authStore.isAuthenticated) {
        // With an authenticated user, update the cart query to find an authenticated cart
        query = accountCartQuery;
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
                    cart={cart}
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

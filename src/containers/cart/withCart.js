import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import accountCartQuery from "./accountCart.gql";
import anonymousCartQuery from "./anonymousCart.gql";
import createCartMutation from "./createCartMutation.gql";
import addCartItemsMutation from "./addCartItemsMutation.gql";

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
      shop: PropTypes.shape({
        _id: PropTypes.string
      })
    }

    componentDidMount() {
      // Update the anonymousCartId if necessary
      this.props.cartStore.setAnonymousCartCredentialsFromLocalStorage();
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

      if (authStore.isAuthenticated === false && cartStore.hasAnonymousCart) {
        // Given an anonymous user, with a cart, add token and cartId to input
        const { anonymousCartId, anonymousCartToken } = cartStore;

        // Add items to an existing anonymous cart
        input.token = anonymousCartToken;
        input.cartId = anonymousCartId;
      } else if (authStore.isAuthenticated === true && cartStore.hasAccountCart) {
        // With an account and an account cart, set the accountCartId on the input object
        input.cartId = cartStore.accountCartId;
      } else if (!cartStore.hasAccountCart && !cartStore.hasAnonymousCart) {
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

      // Anonymous cart query
      let query = anonymousCartQuery;
      let variables = {
        cartId: cartStore.anonymousCartId,
        token: cartStore.anonymousCartToken
      };

      // With an authenticated user, update the cart query to find an authenticated cart
      if (authStore.isAuthenticated) {
        query = accountCartQuery;
        variables = {
          accountId: authStore.accountId,
          shopId: shop._id
        };
      }

      // Mutations based on the availability of a cart
      let mutation = createCartMutation;

      if (cartStore.hasAnonymousCart || cartStore.hasAccountCart) {
        mutation = addCartItemsMutation;
      }

      return (
        <Mutation
          mutation={mutation}
          update={(cache, { data: mutationData }) => {
            // If the mutation data contains a createCart object and we are an anonymous user,
            // then set the anonymous cart details
            if (mutationData && mutationData.createCart && !authStore.isAuthenticated) {
              const { cart, token } = mutationData.createCart;
              cartStore.setAnonymousCartCredentials(cart._id, token);
            }
          }}
        >
          {(mutationFunction) => (
            <Query query={query} variables={variables}>
              {({ data: cartData, fetchMore }) => {
                const { cart } = cartData || {};
                const { pageInfo } = (cart && cart.items) || {};

                // With an authenticated cart, set the accountCartId for later use
                if (cart && authStore.isAuthenticated) {
                  cartStore.setAccountCartId(cart._id);
                }

                return (
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
                          if (fetchMoreCart && fetchMoreCart.items.edges.length) {
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
                );
              }}
            </Query>
          )}
        </Mutation>
      );
    }
  }
);

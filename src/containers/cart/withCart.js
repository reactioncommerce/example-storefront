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

      // Given an anonymous user, create or update an anonymous cart with provided items
      if (authStore.isAuthenticated === false) {
        if (cartStore.hasAnonymousCart) {
          const { anonymousCartId, anonymousCartToken } = cartStore;

          // Add items to an existing anonymous cart
          mutation({
            variables: {
              input: {
                items: data.items,
                token: anonymousCartToken,
                cartId: anonymousCartId
              }
            }
          });
        } else {
          // Create a new cart with items
          mutation({
            variables: {
              input: {
                items: data.items,
                shopId: shop._id
              }
            }
          });
        }
      }
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

      if (cartStore.hasAnonymousCart) {
        mutation = addCartItemsMutation;
      }

      return (
        <Mutation
          mutation={mutation}
          update={(cache, { data: mutationData }) => {
            if (mutationData && mutationData.createCart) {
              const { cart, token } = mutationData.createCart;
              cartStore.setAnonymousCartCredentials(cart._id, token);
            }
          }}
        >
          {(mutationFunction) => (
            <Query query={query} variables={variables}>
              {({ data: cartData }) => (
                <Component
                  {...this.props}
                  addItemsToCart={(items) => {
                    this.handleAddItemsToCart(mutationFunction, {
                      items
                    });
                  }}
                  cart={cartData && cartData.cart}
                />
              )}
            </Query>
          )}
        </Mutation>
      );
    }
  }
);

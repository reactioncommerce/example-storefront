import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import accountCartQuery from "./accountCart.gql";
import anonymousCartQuery from "./anonymousCart.gql";
import createCartMutation from "./createCartMutation.gql";

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
        cartId: PropTypes.string,
        setCartIdFromLocalStorage: PropTypes.func
      }),
      shop: PropTypes.shape({
        _id: PropTypes.string
      })
    }

    componentDidMount() {
      // Update the cartId if necessary
      this.props.cartStore.setCartIdFromLocalStorage();
    }

    /**
     * @name handleAddItemsToCart
     * @summary Called when addItemsToCart callback is called
     * @private
     * @ignore
     * @param {Object} mutations An object containing Apollo GraphQL mutation functions
     * @param {Function} mutations.createCart Create cart mutation function
     * @param {Object} data An an object containing input data for mutations
     * @param {Array} data.items An an array of CartItemInput objects
     * @returns {undefined} No return
     */
    handleAddItemsToCart(mutations, data) {
      const { authStore, cartStore, shop } = this.props;

      // Given an anonymous user, create or update an anonymous cart with provided items
      if (authStore.isAuthenticated === false) {
        if (cartStore.hasAnonymousCart) {
          // Add items to an existing anonymous cart
          mutations.addItemsToCart({
            variables: {
              input: {
                items: data.items,
                shopId: shop._id
              }
            }
          });
        } else {
          // Create a new cart with items
          mutations.createCart({
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
        cartId: cartStore.cartId,
        token: authStore.token
      };

      // With an authenticated user, update the cart query to find an authenticated cart
      if (authStore.isAuthenticated) {
        query = accountCartQuery;
        variables = {
          accountId: authStore.accountId,
          shopId: shop._id
        };
      }

      return (
        <Mutation mutation={createCartMutation}>
          {(createCart) => (
            <Query query={query} variables={variables}>
              {({ data }) => (
                <Component
                  {...this.props}
                  addItemsToCart={(items) => {
                    this.handleAddItemsToCart({
                      createCart
                    }, { items });
                  }}
                  cart={data && data.cart}
                />
              )}
            </Query>
          )}
        </Mutation>
      );
    }
  }
);

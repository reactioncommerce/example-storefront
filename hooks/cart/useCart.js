import { useEffect, useMemo, useCallback } from "react";
import { useLazyQuery, useMutation, useApolloClient } from "@apollo/client";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useViewer from "hooks/viewer/useViewer";
import cartItemsConnectionToArray from "lib/utils/cartItemsConnectionToArray";
import {
  createCartMutation,
  addCartItemsMutation,
  removeCartItemsMutation,
  reconcileCartsMutation,
  setEmailOnAnonymousCartMutation,
  setFulfillmentOptionCartMutation,
  setShippingAddressCartMutation,
  updateCartItemsQuantityMutation,
  updateFulfillmentOptionsForGroup
} from "./mutations.gql";
import {
  accountCartByAccountIdQuery,
  anonymousCartByCartIdQuery
} from "./queries.gql";


/**
 * Hook to get cart information
 *
 * @returns {Object} the user's current cart
 */
export default function useCart() {
  const { cartStore } = useStores();
  const [viewer, isLoadingViewer] = useViewer();
  const shop = useShop();
  const apolloClient = useApolloClient();

  const accountId = viewer && viewer._id;

  const shouldSkipAccountCartByAccountIdQuery = Boolean(!accountId || cartStore.hasAnonymousCartCredentials || isLoadingViewer || !shop || !shop._id);
  const shouldSkipAnonymousCartByCartIdQuery = Boolean(accountId || isLoadingViewer || !cartStore.anonymousCartId || !cartStore.anonymousCartToken);

  const [
    fetchAccountCart,
    { loading: isLoading, called: accountCartQueryCalled, data: cartData, fetchMore, refetch: refetchAccountCart }
  ] = useLazyQuery(accountCartByAccountIdQuery, {
    variables: {
      accountId,
      shopId: shop && shop._id
    },
    pollInterval: shouldSkipAccountCartByAccountIdQuery ? 0 : 10000
  });


  const [
    fetchAnonymousCart,
    { data: cartDataAnonymous, called: anonymousCartQueryCalled, refetch: refetchAnonymousCart }
  ] = useLazyQuery(anonymousCartByCartIdQuery, {
    variables: {
      cartId: cartStore.anonymousCartId,
      cartToken: cartStore.anonymousCartToken
    },
    pollInterval: shouldSkipAnonymousCartByCartIdQuery ? 0 : 10000
  });

  if (!accountCartQueryCalled && !shouldSkipAccountCartByAccountIdQuery) {
    fetchAccountCart();
  } else if (!anonymousCartQueryCalled && !shouldSkipAnonymousCartByCartIdQuery) {
    fetchAnonymousCart();
  }

  useEffect(() => {
    if (!shouldSkipAccountCartByAccountIdQuery && accountCartQueryCalled) {
      refetchAccountCart();
    }
    if (!shouldSkipAnonymousCartByCartIdQuery && anonymousCartQueryCalled) {
      refetchAnonymousCart();
    }
  }, [viewer, refetchAccountCart]);

  const cart = useMemo(() => {
    if (!shouldSkipAccountCartByAccountIdQuery && cartData) {
      return cartData.cart;
    }
    if (!shouldSkipAnonymousCartByCartIdQuery && cartDataAnonymous) {
      return cartDataAnonymous.cart;
    }

    return {};
  }, [cartData, cartDataAnonymous, shouldSkipAccountCartByAccountIdQuery, shouldSkipAnonymousCartByCartIdQuery]);

  const pageInfo = useMemo(() => {
    if (cart && cart.items) return cart.items.pageInfo;
    return {};
  }, [cart]);

  // With an authenticated cart, set the accountCartId for later use
  useEffect(() => {
    if (cart && cart.account && cart.account._id === (viewer && viewer._id)) {
      cartStore.setAccountCartId(cart._id);
    } else {
      cartStore.setAccountCartId(null);
    }
  }, [cart, cartStore.setAccountCartId, viewer]);

  const cartIdAndCartToken = () => {
    const { accountCartId, anonymousCartId, anonymousCartToken } = cartStore;
    let cartToken = {};
    if (!accountCartId) {
      cartToken = { cartToken: anonymousCartToken };
    }

    return {
      cartId: accountCartId || anonymousCartId,
      ...cartToken
    };
  };

  const [addOrCreateCartMutation, {
    loading: addOrCreateCartLoading
  }] = useMutation(cart && cart._id ? addCartItemsMutation : createCartMutation, {
    onCompleted(addOrCreateCartMutationData) {
      if (addOrCreateCartMutationData && addOrCreateCartMutationData.createCart && (!viewer || !viewer._id)) {
        const { cart: cartPayload, token } = addOrCreateCartMutationData.createCart;
        cartStore.setAnonymousCartCredentials(cartPayload._id, token);
      }

      const { accountCartId, anonymousCartToken } = cartStore;
      if (accountCartId) {
        refetchAccountCart();
      } else if (anonymousCartToken) {
        refetchAnonymousCart();
      }
    }
  });

  const [removeCartItemsMutationFun, {
    loading: removeCartItemsLoading
  }] = useMutation(removeCartItemsMutation, {
    update(cache, { data: mutationData }) {
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

  const handleRemoveCartItems = useCallback(async (itemIds) => removeCartItemsMutationFun({
    variables: {
      input: {
        cartId: cartStore.anonymousCartId || cartStore.accountCartId,
        cartItemIds: (Array.isArray(itemIds) && itemIds) || [itemIds],
        cartToken: cartStore.anonymousCartToken || null
      }
    }
  }), [cartStore.anonymousCartId, cartStore.accountCartId, cartStore.anonymousCartToken]);

  const handleAddItemsToCart = async (data, isCreating) => {
    const input = {
      items: data.items
    };

    if (!isCreating && (!viewer || !viewer._id) && cartStore.hasAnonymousCartCredentials) {
      // Given an anonymous user, with a cart, add token and cartId to input
      const { anonymousCartId, anonymousCartToken } = cartStore;

      // Add items to an existing anonymous cart
      input.cartToken = anonymousCartToken;
      input.cartId = anonymousCartId;
    } else if (!isCreating && viewer && viewer._id && cartStore.hasAccountCart) {
      // With an account and an account cart, set the accountCartId on the input object
      input.cartId = cartStore.accountCartId;
    } else if (isCreating) {
      // With no anonymous or account cart, add shop Id to input as it will be needed for the create cart mutation
      input.shopId = shop._id;
    }

    // Run the mutation function provided as a param.
    // It may take the form of `createCart` or `addCartItems` depending on the
    // availability of a cart for either an anonymous or logged-in account.
    return addOrCreateCartMutation({
      variables: {
        input
      }
    });
  };

  const handleUpdateFulfillmentOptionsForGroup = async (fulfillmentGroupId) => {
    await apolloClient.mutate({
      mutation: updateFulfillmentOptionsForGroup,
      variables: {
        input: {
          ...cartIdAndCartToken(),
          fulfillmentGroupId
        }
      }
    });
  };

  // If we are authenticated, reconcile carts
  useEffect(() => {
    if (cartStore.hasAnonymousCartCredentials && viewer && viewer._id && cartStore.isReconcilingCarts === false) {
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
              if (accountCartQueryCalled) {
                refetchAccountCart();
              }
            }
          }

          cartStore.setIsReconcilingCarts(false);
        },
        variables: {
          input: {
            anonymousCartId: cartStore.anonymousCartId,
            cartToken: cartStore.anonymousCartToken,
            shopId: shop && shop._id
          }
        }
      });
    }
  }, [viewer, cartStore.hasAnonymousCartCredentials, cartStore.isReconcilingCarts, apolloClient]);

  let processedCartData = null;
  if (cart) {
    processedCartData = {
      ...cart,
      items: cartItemsConnectionToArray(cart.items)
    };
  }

  return {
    addItemsToCart: (items) => handleAddItemsToCart({ items }, !cart || !cart._id),
    addOrCreateCartLoading,
    cart: processedCartData,
    checkoutMutations: {
      onSetFulfillmentOption: async ({ fulfillmentGroupId, fulfillmentMethodId }) => {
        const cartIdData = cartIdAndCartToken();

        if (!cartIdData.cartId) return null;

        const response = await apolloClient.mutate({
          mutation: setFulfillmentOptionCartMutation,
          variables: {
            input: {
              ...cartIdData,
              fulfillmentGroupId,
              fulfillmentMethodId
            }
          }
        });

        return response;
      },
      onSetShippingAddress: async (address) => {
        const response = await apolloClient.mutate({
          mutation: setShippingAddressCartMutation,
          variables: {
            input: {
              ...cartIdAndCartToken(),
              address
            }
          }
        });

        // Update fulfillment options for current cart
        const { data: { setShippingAddressOnCart } } = response;
        handleUpdateFulfillmentOptionsForGroup(setShippingAddressOnCart.cart.checkout.fulfillmentGroups[0]._id);

        return response;
      }
    },
    hasMoreCartItems: (pageInfo && pageInfo.hasNextPage) || false,
    isLoadingCart: isLoadingViewer || isLoading,
    loadMoreCartItems: () => {
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
    },
    onChangeCartItemsQuantity: async (cartItems) => {
      await apolloClient.mutate({
        mutation: updateCartItemsQuantityMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId || cartStore.accountCartId,
            items: (Array.isArray(cartItems) && cartItems) || [cartItems],
            cartToken: cartStore.anonymousCartToken || null
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
    },
    onRemoveCartItems: handleRemoveCartItems,
    removeCartItemsLoading,
    clearAuthenticatedUsersCart: () => {
      if (viewer && viewer._id) {
        apolloClient.cache.writeQuery({
          query: accountCartByAccountIdQuery,
          data: { cart: null },
          variables: {
            accountId: viewer && viewer._id,
            shopId: shop && shop._id
          }
        });
      }
    },
    refetchAccountCart,
    setEmailOnAnonymousCart: async ({ email }) => {
      await apolloClient.mutate({
        mutation: setEmailOnAnonymousCartMutation,
        variables: {
          input: {
            ...cartIdAndCartToken(),
            email
          }
        }
      });
    }
  };
}

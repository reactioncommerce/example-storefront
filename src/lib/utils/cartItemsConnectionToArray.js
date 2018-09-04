/**
 * @name cartItemsConnectionToArray
 * @summary Transform cart items relay style connection into a simple array of objects with some additional transformations
 * @param {Object} cartItemsConnection Cart items relay style connection
 * @param {Array.<Object>} items.edges An array of edges
 * @returns {Array.<Object>} Returns an array of cart item objects
 */
export default function cartItemsConnectionToArray(cartItemsConnection) {
  // Return a blank array if you don't have good data to begin with
  if (!cartItemsConnection || !cartItemsConnection.edges) {
    return [];
  }

  // Make a copy to be able to mutate array if items
  const cartItems = [...cartItemsConnection.edges];

  return cartItems.map(({ node }) => {
    // Make a copy to be able to mutate
    const item = { ...node };

    return item;
  });
}

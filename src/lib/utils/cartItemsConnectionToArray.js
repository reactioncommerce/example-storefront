/**
 * @name cartItemsConnectionToArray
 * @summary Transform cart items relay style connection into a simple array of objects with some additional transformations
 * @param {Object} cartItemsConnection Cart items relay style connection
 * @param {Array.<Object>} items.edges An array of edges
 * @param {Object} options An object containing additional options used in the data transformation
 * @param {Object} options.externalAssetsUrl URL prefix for images and other assets
 * @returns {Array.<Object>} Returns an array of cart item objects
 */
export default function cartItemsConnectionToArray(cartItemsConnection, options) {
  // Make a copy to be able to mutate array if items
  const cartItems = [...cartItemsConnection.edges];
  const opts = {
    externalAssetsUrl: "",
    ...options
  };

  return cartItems.map(({ node }) => {
    // Make a copy to be able to mutate
    const item = { ...node };

    if (item.imageURLs) {
      const imageURLs = {};

      // Prefix image url with the external assets url
      Object.keys(item.imageURLs).forEach((key) => {
        imageURLs[key] = `${opts.externalAssetsUrl}${node.imageURLs[key]}`;
      });

      item.imageURLs = imageURLs;
    }

    return item;
  });
}

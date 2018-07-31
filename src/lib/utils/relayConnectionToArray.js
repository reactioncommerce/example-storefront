/**
 *
 * @param {Object} connectionObject A Relay style connection object
 * @param {Array.<Object>} connectionObject.edges An array of edges
 * @returns {Array.<Object>} Returns an array of cart item objects
 */
export default function relayConnectionToArray(connectionObject) {
  return connectionObject.edges.map(({ node }) => node);
}

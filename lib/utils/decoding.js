/**
 * Decode a Base64 encoded id
 *
 * @param {String} opaqueId - A a base64 encoded id
 * @returns {String} - A base64 decoded id
 */
function decodeOpaqueId(opaqueId) {
  if (opaqueId === undefined || opaqueId === null) return null;
  const unencoded = Buffer.from(opaqueId, "base64").toString("utf8");
  const [namespace, id] = unencoded.split(":");
  return { namespace, id };
}

module.exports = {
  decodeOpaqueId
};

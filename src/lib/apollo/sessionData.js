import { Buffer } from "buffer";
import Cookies from "js-cookie";

/**
 * @name getSessionData
 * @method
 * @private
 * @return {Object} session data
 */
export function getUserSessionData() {
  let sessionData = {};
  const data = Cookies.get("storefront-session");
  if (!data) return {};

  try {
    const expanded = Buffer.from(data, "base64").toString("utf8");
    sessionData = JSON.parse(expanded, (key, value) => {
      if (key === "user" && typeof value === "string") return JSON.parse(value);
      return value;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error while reading session data: ${error}`);
  }
  if (typeof sessionData.passport !== "object") {
    return {};
  }
  return sessionData.passport.user;
}

/**
 * @name createNewSessionData
 * @method
 * @private
 * @param {Object} json session data
 * @return {String} encoded string containing new session info
 */
export function createNewSessionData(json) {
  let newSessionInfo = "";
  try {
    newSessionInfo = Buffer.from(JSON.stringify({
      passport: {
        user: {
          accessToken: json.access_token,
          refreshToken: json.refresh_token
        }
      }
    })).toString("base64");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error writing new session info", error);
  }
  return newSessionInfo;
}

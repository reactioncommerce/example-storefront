import redirect from "apiUtils/redirect";
import appConfig from "../../../config.js";

/**
 * Redirects to the change password view
 *
 * @param {Obect} req - the request
 * @param {Object} res - the response
 * @returns {undefined}
 */
export default async function changePassword(req, res) {
  const { email } = req.query;

  let from = req.headers.Referer;
  if (typeof from !== "string" || from.length === 0) {
    from = appConfig.CANONICAL_URL;
  }

  let url = appConfig.OAUTH2_IDP_PUBLIC_CHANGE_PASSWORD_URL;
  url = url.replace("EMAIL", encodeURIComponent(email || ""));
  url = url.replace("FROM", encodeURIComponent(from));

  redirect(res, 302, url);
}

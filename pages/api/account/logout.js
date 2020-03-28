import passportMiddleware from "apiUtils/passportMiddleware";
import appConfig from "../../../config.js";

let baseUrl = appConfig.CANONICAL_URL;
if (!baseUrl.endsWith("/")) baseUrl = `${baseUrl}/`;
const oauthPostLogoutRedirectUrl = `${baseUrl}post-logout-callback`;

const logout = async (req, res) => {
  req.session.redirectTo = appConfig.CANONICAL_URL;
  const { idToken } = req.user || {};

  req.logout();

  if (idToken) {
    // Request log out of OAuth2 session
    res.redirect(`${appConfig.OAUTH2_PUBLIC_LOGOUT_URL}?post_logout_redirect_uri=${oauthPostLogoutRedirectUrl}&id_token_hint=${idToken}`);
  } else {
    res.redirect(appConfig.CANONICAL_URL);
  }
};

export default passportMiddleware(logout);

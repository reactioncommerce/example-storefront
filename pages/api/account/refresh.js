import passportMiddleware from "apiUtils/passportMiddleware";
import fetch from "isomorphic-unfetch";
import appConfig from "../../../config.js";

const refresh = async (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    try {
      const user = JSON.parse(req.session.passport.user);

      const { refreshToken } = user;

      if (refreshToken) {
        const { OAUTH2_TOKEN_URL, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET } = appConfig;

        const response = await fetch(OAUTH2_TOKEN_URL, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: `grant_type=refresh_token&refresh_token=${refreshToken}&response_type=token&client_id=${OAUTH2_CLIENT_ID}&client_secret=${OAUTH2_CLIENT_SECRET}`
        });

        const responseData = await response.json();

        if (responseData) {
          const { access_token, id_token, refresh_token } = responseData;

          req.session.passport.user = JSON.stringify({
            accessToken: access_token,
            idToken: id_token,
            refreshToken: refresh_token
          });

          return res.redirect(req.session.redirectTo || "/");
        }
      }
    } catch (error) {
      console.error("error-token-refresh", error);
    }
  }

  req.logout();
  res.redirect(req.session.redirectTo || "/");
};

export default passportMiddleware(refresh);

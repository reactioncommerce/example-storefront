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
          const { access_token: accessToken, id_token: idToken, refresh_token: newToken } = responseData;

          req.session.passport.user = JSON.stringify({
            accessToken,
            idToken,
            refreshToken: newToken
          });

          return res.status(200).send(JSON.stringify({
            accessToken
          }));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("error-token-refresh", error);
    }
  }

  req.logout();
  return res.status(200).send(JSON.stringify({
    error: "Could not refresh token"
  }));
};

export default passportMiddleware(refresh);

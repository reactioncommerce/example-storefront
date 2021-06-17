import OAuth2Strategy from "passport-oauth2";
import passport from "passport";
import sessions from "client-sessions";
import appConfig from "../config.js";
import redirect from "./redirect";

export { default as passport } from "passport";

let baseUrl = appConfig.CANONICAL_URL;
if (!baseUrl.endsWith("/")) baseUrl = `${baseUrl}/`;

const oauthRedirectUrl = `${baseUrl}callback`;

// This is needed to allow custom parameters (e.g. loginActions) to be included
// when requesting authorization. This is setup to allow only loginAction to pass through
OAuth2Strategy.prototype.authorizationParams = function (options = {}) {
  return { loginAction: options.loginAction };
};

passport.use("oauth2", new OAuth2Strategy({
  authorizationURL: appConfig.OAUTH2_AUTH_URL,
  tokenURL: appConfig.OAUTH2_TOKEN_URL,
  clientID: appConfig.OAUTH2_CLIENT_ID,
  clientSecret: appConfig.OAUTH2_CLIENT_SECRET,
  callbackURL: oauthRedirectUrl,
  state: true,
  scope: ["offline", "openid"]
}, (accessToken, refreshToken, params, profile, cb) => {
  cb(null, { accessToken, refreshToken, idToken: params.id_token });
}));

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

export default (handler) => (req, res) => {
  if (!res.redirect) {
    res.redirect = (location) => redirect(res, 302, location);
  }

  sessions({
    cookieName: "session", // This name is required so passport picks it up correctly
    secret: appConfig.SESSION_SECRET,
    duration: appConfig.SESSION_MAX_AGE_MS
  })(req, res, () =>
    passport.initialize()(req, res, () =>
      passport.session()(req, res, () =>
        handler(req, res))));
};
